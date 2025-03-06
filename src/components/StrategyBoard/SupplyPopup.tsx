import { useForm, Controller } from 'react-hook-form';
import { baseSepolia } from 'wagmi/chains';
import { useAccount } from 'wagmi';
import {
  waitForTransactionReceipt,
  signTypedData,
  readContract,
} from '@wagmi/core';
import { ToastContainer, toast } from 'react-toastify';

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

interface SupplyPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupplyPopup({ isOpen, onClose }: SupplyPopupProps) {
  const { control, handleSubmit } = useForm<DepositFormData>();
  const { address } = useAccount();

  async function onSubmit(data: DepositFormData) {
    const timestampInSeconds = Math.floor(Date.now() / 1000);
    const deadline = BigInt(timestampInSeconds) + BigInt(PERMIT_EXPIRY);
    const amount = serializeAmount(data.deposit.amount, USDC_DECIMAL);

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

    const calls = await createMorphoCall(address!, amount, deadline, signature);
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
  }

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0  flex items-center justify-center z-50">
        <div className="bg-gray-900/80 absolute t-0 left-0 w-full h-full z-0"></div>
        <div className="bg-[#1E90FF] text-white rounded-lg shadow-lg p-6 w-[90vw] max-w-[600px] z-10 relative">
          {/* Header */}
          <div className="flex justify-center items-center border-b border-white pb-2">
            <div className="items-center">
              <span className="text-3xl inline-block">🛡️</span>
              <img src="/morpho/eventInfo.svg" className="h-6 inline-block" />
            </div>
            <img
              src="/morpho/cancel.svg"
              className="h-10 absolute -right-2 top-2 cursor-pointer"
              onClick={onClose}
            />
          </div>

          {/* Body */}
          <div className="mt-4 flex flex-col">
            <img src="/Stake/information.svg" className="h-18" />
            <img src="/Stake/intro.svg" className="h-10 mt-10" />
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
                      parseFloat(value.amount) > 0 ||
                      'Amount must be greater than 0',
                  },
                }}
                render={({ field }) => <CurrencyInput {...field} />}
              />
              <div className="self-center max-sm:mt-auto mt-5">
                <button type="submit">
                  <img
                    src="/Stake/confirm.svg"
                    className="h-16 mt-6 cursor-pointer"
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer position="bottom-right" />
      </div>
    </>
  );
}
