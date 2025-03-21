import { useForm } from 'react-hook-form';
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
import APY from '../Morpho/Apy';

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
    <section className="flex flex-col items-center px-5 py-10 bg-blue-600 shadow min-h-[546px]">
      <h1 className="mb-8 text-4xl text-center text-white max-sm:text-3xl [font-family:'Lilita_One',Helvetica] [text-shadow:2px_2px_0px_#000] [-webkit-text-stroke:1.5px_#000]">
        Ready to Deploy? Let&apos;s Lock It In!
      </h1>

      <div className="flex items-center justify-between w-full max-w-[800px] mb-10 px-4">
        <h2 className="text-4xl text-white [font-family:'Lilita_One',Helvetica] [text-shadow:2px_2px_0px_#000] [-webkit-text-stroke:1.5px_#000]">
          Beets staking strategy
        </h2>

        <div className="flex items-center gap-4">
          {/* APY Badge with heart icon */}
          <APY />

          <div
            className="flex items-center bg-black rounded-lg py-2 px-4 ml-3 h-10"
            style={{
              textShadow: '-2px 1px 0px #000000',
              fontFamily: 'Lilita One, cursive',
              letterSpacing: '1%',
            }}>
            <span className="text-[25px] text-[#33FF6C]">Low Risk</span>
          </div>
        </div>
      </div>

      <div className="mb-6 w-full max-w-[562px]">
        <div className="mb-2 text-white [font-family:'Lilita_One',Helvetica]">
          Amount to deploy
        </div>
        <div className="relative flex items-center">
          <CurrencyInput />
        </div>
      </div>

      <p className="mb-10 text-xl tracking-normal text-center text-white max-w-[654px] [font-family:'Lilita_One',Helvetica]">
        Once you confirm, your funds will be allocated automatically.
        <br />
        No extra steps—just sit back and let the AI optimize for you
      </p>

      <div className="flex justify-center mb-4">
        <div className="relative">
          {/* Shadow effect - darker blue parallelogram beneath */}
          <div
            className="absolute inset-0 bg-blue-900"
            style={{
              transform: 'skew(-15deg) translateY(4px)',
              width: '100%',
              height: '100%',
              zIndex: -1,
            }}></div>

          {/* Main button - blue parallelogram */}
          <img
            src="/confirm.png"
            onClick={handleSubmit(onSubmit)}
            className="h-16 cursor-pointer"
          />
        </div>
      </div>
    </section>
  );
}
