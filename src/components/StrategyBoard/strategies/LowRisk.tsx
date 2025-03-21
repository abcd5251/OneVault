import { useAccount, useReadContract } from 'wagmi';
import { signTypedData } from '@wagmi/core';
import { waitForTransactionReceipt } from '@wagmi/core';
import { baseSepolia } from 'wagmi/chains';

import { config } from '../../../config';
import {
  EXECUTOR,
  USDC,
  USDC_DECIMAL,
  TYPES,
  PERMIT_EXPIRY,
} from '../../../helpers/constants';
import { usdcAbi } from '../../../abis/usdc';
import { execution } from '../../../helpers/mock-backend';
import { createMorphoCall } from '../../../helpers/strategy';

const MOCK_VAUlE = BigInt(1);

export function LowRisk({
  setShowPopup,
}: {
  setShowPopup: (show: boolean) => void;
}) {
  const { address } = useAccount();
  const { data: nonce } = useReadContract({
    abi: usdcAbi,
    address: USDC,
    functionName: 'nonces',
    args: [address!],
  });
  async function testSign() {
    const timestampInSeconds = Math.floor(Date.now() / 1000);
    const deadline = BigInt(timestampInSeconds) + BigInt(PERMIT_EXPIRY);
    const amount = MOCK_VAUlE * BigInt(USDC_DECIMAL);

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
    console.log('Calls', calls);
    const tx = await execution(address!, calls);

    await waitForTransactionReceipt(config, {
      hash: tx,
    });

    console.log('Tx done');
    console.log('Call tx', tx);
  }

  return (
    <div
      onClick={() => setShowPopup(true)}
      className="w-1/3 border-2 border-black cursor-pointer hover:scale-105 transition-all duration-300">
      <div className="text-right text-[#7583A4] bg-black">
        <p>Low risk Strategy</p>
      </div>
      <div
        style={{
          textShadow: ' -1.5px 1px 0px #000000',
          WebkitTextFillColor: 'white',
          WebkitTextStroke: '1.2px black',
        }}
        className="bg-[#82D724] text-white pl-3">
        <div className="flex items-center py-2">
          <div className="text-5xl mr-3">🛡️</div>
          <div>
            <p className="uppercase text-3xl">Safe Harbour</p>
            <p className="uppercase text-2xl">STABLE, LOW RISK PLAYS</p>
          </div>
        </div>
      </div>
      <div className="bg-[url('/defi-background.png')] object-contain h-32 w-full" />
    </div>
  );
}
