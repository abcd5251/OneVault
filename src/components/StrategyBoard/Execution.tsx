import { useForm, Controller } from 'react-hook-form';
import { baseSepolia } from 'wagmi/chains';
import { useAccount } from 'wagmi';
import {
  waitForTransactionReceipt,
  signTypedData,
  readContract,
} from '@wagmi/core';
import { toast } from 'react-toastify';

import {
  EXECUTOR,
  USDC,
  USDC_DECIMAL,
  PERMIT_EXPIRY,
  TYPES,
} from '../../helpers/constants';
import CurrencyInput from '../ui/CurrencyInput';
import { config } from '../../config';
import { usdcAbi } from '../../abis/usdc';
import { execution } from '../../helpers/mock-backend';
import { createMorphoCall } from '../../helpers/strategy';
import { serializeAmount } from '../../helpers/utils';

interface DepositFormData {
  deposit: {
    currency: string;
    amount: string;
  };
}

export default function Execution() {
  const { control, handleSubmit } = useForm<DepositFormData>();
  const { address } = useAccount();

  async function onSubmit(data: DepositFormData) {
    const timestampInSeconds = Math.floor(Date.now() / 1000);
    const deadline = BigInt(timestampInSeconds) + BigInt(PERMIT_EXPIRY);
    const amount = serializeAmount(data.deposit.amount, USDC_DECIMAL);

    try {
      const nonce = await readContract(config, {
        abi: usdcAbi,
        address: USDC,
        functionName: 'nonces',
        args: [address!],
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
          owner: address!,
          spender: EXECUTOR,
          value: amount,
          nonce: nonce!,
          deadline,
        },
      });

      const calls = await createMorphoCall(
        address!,
        amount,
        deadline,
        signature,
      );
      const tx = await execution(address!, calls);

      toast.promise(
        waitForTransactionReceipt(config, {
          hash: tx,
        }),
        {
          pending: 'Transaction is pending...',
          success: `Transaction confirmed ! \n Tx hash: ${tx}`,
          error: 'Transaction failed',
        },
      );
    } catch (error) {
      console.error('Transaction error:', error);
      toast.error('Transaction failed');
    }
  }

  return (
    <div className="mt-4 flex flex-col">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold">Deposit to Morpho Strategy</h2>
        <p className="text-sm mt-2">
          Deposit your assets into Morpho strategy for optimal yields
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-y-3">
        <Controller
          name="deposit"
          control={control}
          rules={{
            required: 'Please enter an amount',
            validate: {
              positive: (value) =>
                parseFloat(value.amount) > 0 || 'Amount must be greater than 0',
            },
          }}
          render={({ field }) => <CurrencyInput {...field} />}
        />
        <div className="mt-4 text-sm text-center">
          <p>Estimated Annual Yield: 4.2% APY</p>
          <p>No lock-up period, withdraw anytime</p>
        </div>
        <div className="self-center max-sm:mt-auto mt-5">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-2 rounded-full text-white font-bold">
            Confirm Deposit
          </button>
        </div>
      </form>
    </div>
  );
}
