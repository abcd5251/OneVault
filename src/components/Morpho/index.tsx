import { useState } from 'react';
import APY from './apy';
import LinkComponent from './LinkComponent';

interface MorphoVaultProps {
  handleChatBox: () => void;
  setShowDepositForm: (show: boolean) => void;
}

export default function MorphoVault({
  handleChatBox,
  setShowDepositForm,
}: MorphoVaultProps) {
  // const [showDepositForm, setShowDepositForm] = useState(false);
  const [showMorpho, setShowMorpho] = useState(false);

  return (
    <div className="relative px-24 py-10 bg-[#105DE5]">
      <img src="/morpho/Morpho.svg" className="h-10 mb-4 inline-block ml-0.5" />

      <div className="relative inline-block">
        <img
          src="/morpho/mark.svg"
          className="h-8 mb-4 ml-2 inline-block cursor-pointer"
          onClick={() => setShowMorpho(!showMorpho)}
        />
        {showMorpho && (
          <div
            className="absolute"
            style={{
              left: '50%',
              bottom: '100%',
              transform: 'translateX(-50%)',
              maxWidth: 'none',
              width: 'auto',
              zIndex: 50,
            }}>
            <img
              src="/morpho/morphoShow.svg"
              alt="What's Morpho"
              style={{
                maxWidth: 'none',
                width: 'auto',
                height: 'auto',
              }}
            />
          </div>
        )}
      </div>

      <LinkComponent />
      <div className="space-y-4">
        <h1 className="text-[25px] ">
          Use Gauntlet WETH Prime Vault in Morpho to earn steady returns
        </h1>
        <div className="flex flex-wrap items-center">
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
      <div className="mt-8 flex flex-col items-center gap-y-2">
        <img
          src="/morpho/AiButton.svg"
          onClick={handleChatBox}
          className="h-16 ml-1.5 cursor-pointer"
        />
        <img
          src="/morpho/deposit.svg"
          onClick={() => setShowDepositForm(true)}
          className="h-16 cursor-pointer"
        />
      </div>
    </div>
  );
}
