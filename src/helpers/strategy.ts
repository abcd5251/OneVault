import { encodeFunctionData, toHex } from 'viem';
import type { Address, Hex } from 'viem';
import { readContract } from '@wagmi/core';

import type { Call } from '@/services/strategyExecutionService';
import { usdcAbi } from '@/abis/usdc';
import { morphoAbi } from '@/abis/morpho';
import { config } from '@/config';
import { Contracts } from '@/constants/contracts';

// TODO(optional): move this function into LowRiskExecutor
export async function createMorphoCall(
  contracts: Contracts,
  user: Address,
  amount: bigint,
  deadline: bigint,
  signature: Hex,
) {
  const calls: Call[] = [];
  const { executor, tokens, morpho } = contracts;

  //* Step 1  USDC Permit
  {
    const data = encodeFunctionData({
      abi: usdcAbi,
      functionName: 'permit',
      args: [user, executor, amount, deadline, signature],
    });
    calls.push({
      target: tokens.usdc.address,
      callData: data,
    });
  }

  //* Step 2  USDC Transfer to Executor
  {
    const data = encodeFunctionData({
      abi: usdcAbi,
      functionName: 'transferFrom',
      args: [user, executor, amount],
    });
    calls.push({
      target: tokens.usdc.address,
      callData: data,
    });
  }

  //* Step 3 Approve to morpho blue
  {
    const data = encodeFunctionData({
      abi: usdcAbi,
      functionName: 'approve',
      args: [morpho.blue, amount],
    });
    calls.push({
      target: tokens.usdc.address,
      callData: data,
    });
  }

  //* Step 4  Supply USDC to morpho blue
  {
    const marketParams = await getMarketParams(
      morpho.blue,
      morpho.wethUsdcMarket,
    );

    const data = encodeFunctionData({
      abi: morphoAbi,
      functionName: 'supply',
      args: [marketParams, amount, BigInt(0), user, toHex('')],
    });
    calls.push({
      target: morpho.blue,
      callData: data,
    });
  }

  return calls;
}

async function getMarketParams(morphoBlue: Address, marketId: Hex) {
  const [loanToken, collateralToken, oracle, irm, lltv] = await readContract(
    config,
    {
      abi: morphoAbi,
      address: morphoBlue,
      functionName: 'idToMarketParams',
      args: [marketId],
    },
  );

  return {
    loanToken,
    collateralToken,
    oracle,
    irm,
    lltv,
  };
}
