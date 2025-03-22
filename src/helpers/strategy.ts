import { encodeFunctionData, toHex } from 'viem';
import type { Address, Hex } from 'viem';
import { readContract } from '@wagmi/core';

import type { Call } from './mock-backend';

import { usdcAbi } from '@/abis/usdc';
import {
  EXECUTOR,
  MORPHO_BLUE,
  MORPHO_WETH_USDC_MARKET,
  USDC,
} from '@/helpers/constants';
import { morphoAbi } from '@/abis/morpho';
import { config } from '@/config';

export async function createMorphoCall(
  user: Address,
  amount: bigint,
  deadline: bigint,
  signature: Hex,
) {
  const calls: Call[] = [];

  //* Step 1  USDC Permit
  {
    const data = encodeFunctionData({
      abi: usdcAbi,
      functionName: 'permit',
      args: [user, EXECUTOR, amount, deadline, signature],
    });
    calls.push({
      target: USDC,
      callData: data,
    });
  }

  //* Step 2  USDC Transfer to Executor
  {
    const data = encodeFunctionData({
      abi: usdcAbi,
      functionName: 'transferFrom',
      args: [user, EXECUTOR, amount],
    });
    calls.push({
      target: USDC,
      callData: data,
    });
  }

  //* Step 3 Approve to morpho blue
  {
    const data = encodeFunctionData({
      abi: usdcAbi,
      functionName: 'approve',
      args: [MORPHO_BLUE, amount],
    });
    calls.push({
      target: USDC,
      callData: data,
    });
  }

  //* Step 4  Supply USDC to morpho blue
  {
    const marketParams = await getMarketParams(MORPHO_WETH_USDC_MARKET);

    const data = encodeFunctionData({
      abi: morphoAbi,
      functionName: 'supply',
      args: [marketParams, amount, BigInt(0), user, toHex('')],
    });
    calls.push({
      target: MORPHO_BLUE,
      callData: data,
    });
  }

  return calls;
}

async function getMarketParams(marketId: Hex) {
  const [loanToken, collateralToken, oracle, irm, lltv] = await readContract(
    config,
    {
      abi: morphoAbi,
      address: MORPHO_BLUE,
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
