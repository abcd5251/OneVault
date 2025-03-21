import {
  waitForTransactionReceipt,
  signTypedData,
  readContract,
} from '@wagmi/core';
import { baseSepolia } from 'wagmi/chains';
import { toast } from 'react-toastify';

import {
  EXECUTOR,
  USDC,
  USDC_DECIMAL,
  PERMIT_EXPIRY,
  TYPES,
} from '../../../helpers/constants';
import { config } from '../../../config';
import { usdcAbi } from '../../../abis/usdc';
import { execution } from '../../../helpers/mock-backend';
import { createMorphoCall } from '../../../helpers/strategy';
import { serializeAmount } from '../../../helpers/utils';

export async function executeStrategyTransaction(
  address: string,
  amount: string,
  currency: string,
) {
  const timestampInSeconds = Math.floor(Date.now() / 1000);
  const deadline = BigInt(timestampInSeconds) + BigInt(PERMIT_EXPIRY);
  const serializedAmount = serializeAmount(amount, USDC_DECIMAL);

  try {
    const nonce = await readContract(config, {
      abi: usdcAbi,
      address: USDC,
      functionName: 'nonces',
      args: [address],
    });

    const signature = await signTypedData(config, {
      domain: {
        name: 'USDC',
        chainId: baseSepolia.id,
        verifyingContract: USDC,
        version: '2',
      },
      types: TYPES,
      primaryType: 'Permit',
      message: {
        owner: address,
        spender: EXECUTOR,
        value: serializedAmount,
        nonce: nonce!,
        deadline,
      },
    });

    const calls = await createMorphoCall(
      address,
      serializedAmount,
      deadline,
      signature,
    );
    const tx = await execution(address, calls);

    return waitForTransactionReceipt(config, {
      hash: tx,
    });
  } catch (error) {
    console.error('Transaction error:', error);
    throw error;
  }
}
