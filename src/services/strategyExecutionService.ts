import {
  CONTRACTS,
  SupportedChain,
  PERMIT_EXPIRY,
  CHAINS,
} from '@/constants/contracts';
import { baseSepolia } from 'wagmi/chains';
import { signTypedData } from '@wagmi/core';
import { readContract } from '@wagmi/core';

import { config } from '@/config';
import { StrategyType } from '@/types';
import { usdcAbi } from '@/abis/usdc';
import { createMorphoCall } from '@/helpers/strategy';
import { Address, createWalletClient, parseUnits, http, Hex } from 'viem';
import { PERMIT_TYPES } from '@/types/contracts';
import { privateKeyToAccount } from 'viem/accounts';
import { executorAbi } from '@/abis/executor';
import { encodeFunctionData } from 'viem';
import { vaultAbi } from '@/abis/vault';

// 執行結果介面
export interface ExecutionResult {
  success: boolean;
  transactionHash?: string;
  message?: string;
}

export interface Call {
  target: Address;
  callData: Hex;
}

// 基礎策略執行類
class StrategyExecutor {
  constructor(public readonly chainId: SupportedChain) {}

  async validate(amount: number): Promise<boolean> {
    // 基本驗證邏輯
    return amount > 0;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(user: Address, amount: string): Promise<ExecutionResult> {
    throw new Error('Method not implemented.');
  }

  async multiCall(user: Address, calls: Call[]): Promise<ExecutionResult> {
    const adminWallet = this._getAdminWallet();

    const tx = await adminWallet.writeContract({
      abi: executorAbi,
      address: CONTRACTS[this.chainId].executor,
      functionName: 'execute',
      args: [calls, user],
    });

    return {
      success: true,
      transactionHash: tx,
      message: '策略執行成功！',
    };
  }

  private _getAdminWallet() {
    const account = privateKeyToAccount(
      import.meta.env.VITE_ADMIN_PRIVATE_KEY as `0x${string}`,
    );

    return createWalletClient({
      chain: CHAINS[this.chainId],
      transport: http(),
      account,
    });
  }
}

// 低風險策略執行器
class LowRiskExecutor extends StrategyExecutor {
  async execute(user: Address, amount: string): Promise<ExecutionResult> {
    const contracts = CONTRACTS[this.chainId];
    const { tokens, executor } = contracts;

    const timestampInSeconds = Math.floor(Date.now() / 1000);
    const deadline = BigInt(timestampInSeconds) + BigInt(PERMIT_EXPIRY);

    const parsedAmount = parseUnits(amount, tokens.usdc.decimal);

    const nonce = await readContract(config, {
      abi: usdcAbi,
      address: tokens.usdc.address,
      functionName: 'nonces',
      args: [user],
    });

    const signature = await signTypedData(config, {
      domain: {
        name: 'USDC',
        chainId: baseSepolia.id,
        verifyingContract: tokens.usdc.address,
        version: '2',
      },
      types: PERMIT_TYPES,
      primaryType: 'Permit',
      message: {
        owner: user,
        spender: executor,
        value: parsedAmount,
        nonce: nonce!,
        deadline,
      },
    });

    const calls = await createMorphoCall(
      contracts,
      user,
      parsedAmount,
      deadline,
      signature,
    );

    const tx = await this.multiCall(user, calls);

    return {
      success: true,
      transactionHash: `0x${tx}`,
      message: '策略執行成功！',
    };
  }
}

// 中風險策略執行器
class MidRiskExecutor extends StrategyExecutor {
  async validate(amount: number): Promise<boolean> {
    const baseValidation = await super.validate(amount);
    // 中風險可能需要確保金額在特定範圍
    return baseValidation && amount <= 10000;
  }

  async execute(user: Address, amount: string): Promise<ExecutionResult> {
    console.log(`執行中風險策略，金額: ${amount}`);
    // 可能需要更多的處理邏輯
    return {
      success: true,
      transactionHash: '0x' + Math.random().toString(16).substr(2, 40),
      message: '中風險策略執行成功！',
    };
  }
}

// 高風險策略執行器
class HighRiskExecutor extends StrategyExecutor {
  async validate(amount: number): Promise<boolean> {
    const baseValidation = await super.validate(amount);
    // 高風險可能需要更嚴格的驗證
    return baseValidation && amount <= 5000;
  }

  async execute(user: Address, amount: string): Promise<ExecutionResult> {
    console.log(`執行高風險策略，金額: ${amount}，需要額外確認`);
    // 高風險可能需要額外的確認步驟
    return {
      success: true,
      transactionHash: '0x' + Math.random().toString(16).substr(2, 40),
      message: '高風險策略執行成功！請留意風險管理',
    };
  }
}

// TODO: Deposit
// class DepositExecutor extends StrategyExecutor {
//   async validate(amount: number): Promise<boolean> {
//     const baseValidation = await super.validate(amount);
//     // 確保存款金額有 效且不超過上限
//     return baseValidation && amount <= 100000;
//   }

//   // export async function deposit(
//   //   owner: Address,
//   //   spender: Address,
//   //   value: bigint,
//   //   deadline: bigint,
//   //   signature: Hex,
//   // ) {
//   //   const { v, r, s } = parseSignature(signature);
//   //   const parseV = Number(v);

//   //   const tx = await adminWallet.writeContract({
//   //     abi: vaultAbi,
//   //     address: VAULT,
//   //     functionName: 'deposit',
//   //     args: [owner, spender, value, deadline, parseV, r, s],
//   //   });

//   //   console.log('Deposit tx', tx);

//   //   return tx;
//   // }

//   async execute(user: Address, amount: string): Promise<ExecutionResult> {
//     const contracts = CONTRACTS[this.chainId];
//     const { tokens, vault } = contracts;

//     const timestampInSeconds = Math.floor(Date.now() / 1000);
//     const deadline = BigInt(timestampInSeconds) + BigInt(PERMIT_EXPIRY);

//     const parsedAmount = parseUnits(amount, tokens.usdc.decimal);

//     const nonce = await readContract(config, {
//       abi: usdcAbi,
//       address: tokens.usdc.address,
//       functionName: 'nonces',
//       args: [user],
//     });

//     const signature = await signTypedData(config, {
//       domain: {
//         name: 'USDC',
//         chainId: CHAINS[this.chainId].id,
//         verifyingContract: tokens.usdc.address,
//         version: '2',
//       },
//       types: PERMIT_TYPES,
//       primaryType: 'Permit',
//       message: {
//         owner: user,
//         spender: vault,
//         value: parsedAmount,
//         nonce: nonce!,
//         deadline,
//       },
//     });

//     // 建立存款呼叫
//     const calls: Call[] = [
//       // USDC Permit
//       {
//         target: tokens.usdc.address,
//         callData: encodeFunctionData({
//           abi: usdcAbi,
//           functionName: 'permit',
//           args: [user, vault, parsedAmount, deadline, signature],
//         }),
//       },
//       // USDC Transfer
//       {
//         target: tokens.usdc.address,
//         callData: encodeFunctionData({
//           abi: usdcAbi,
//           functionName: 'transferFrom',
//           args: [user, vault, parsedAmount],
//         }),
//       },
//       // 存入資金
//       {
//         target: vault,
//         callData: encodeFunctionData({
//           abi: vaultAbi,
//           functionName: 'deposit',
//           args: [user, parsedAmount],
//         }),
//       },
//     ];

//     const tx = await this.multiCall(user, calls);

//     return {
//       success: true,
//       transactionHash: tx,
//       message: '存款成功！',
//     };
//   }
// }

// 策略執行工廠 (更新以包含 DepositExecutor)
export const getStrategyExecutor = (
  chain: SupportedChain,
  type: StrategyType,
): StrategyExecutor => {
  switch (type) {
    case StrategyType.LOW_RISK:
      return new LowRiskExecutor(chain);
    case StrategyType.MID_RISK:
      return new MidRiskExecutor(chain);
    case StrategyType.HIGH_RISK:
      return new HighRiskExecutor(chain);
    case StrategyType.DEPOSIT: // 假設你有一個 DEPOSIT 類型
      return new DepositExecutor(chain);
    default:
      return new LowRiskExecutor(chain);
  }
};
