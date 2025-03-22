import { useState } from 'react';
import { useModal } from '@/contexts/ModalContext';
import ApyBadge from '@/components/ui/ApyBadge';
import LinkBadge from '@/components/ui/LinkBadge';
import CurrencyInput from '@/components/ui/CurrencyInput';

type StrategyContentProps = {
  strategyType?: string;
  showDepositForm: boolean;
  setShowDepositForm: (show: boolean) => void;
};

type StrategyConfig = {
  text: {
    icon: string;
    title: string;
    description: string;
    apy: string;
  };
  risk: {
    label: string;
    color: string;
  };
  backgroundColor: string;
  images: {
    banner: string;
    hint: string;
  };
};

export default function StrategyContent({
  strategyType = 'low-risk',
  showDepositForm,
  setShowDepositForm,
}: StrategyContentProps) {
  const [showMorpho, setShowMorpho] = useState(false);
  const { openModal } = useModal();

  // 基於策略類型的配置
  const strategyConfig: Record<string, StrategyConfig> = {
    'low-risk': {
      text: {
        icon: '🛡️',
        title: 'Use Gauntlet WETH Prime Vault in Morpho to earn steady returns',
        description: 'Low Risk Strategy',
        apy: '3.72%',
      },
      risk: {
        label: 'Low Risk',
        color: 'text-[#33FF6C]',
      },
      backgroundColor: 'bg-[#105DE5]',
      images: {
        banner: '/morpho/banner.svg',
        hint: '/morpho/hint.svg',
      },
    },
    'mid-risk': {
      text: {
        icon: '⚖️',
        title:
          'Use Balanced Yield Strategy to optimize returns with moderate risk',
        description: 'Balanced Strategy',
        apy: '3.72%',
      },
      risk: {
        label: 'Mid Risk',
        color: 'text-[#9C3EF4]',
      },
      backgroundColor: 'bg-[#105DE5]',
      images: {
        banner: '/morpho/banner.svg',
        hint: '/morpho/hint.svg',
      },
    },
    'high-risk': {
      text: {
        icon: '🚀',
        title:
          'Sonic-native concentrated liquidity exchange. The ultimate trading hub on Sonic.',
        description: 'Shadow Strategy',
        apy: '134.9',
      },
      risk: {
        label: 'High Risk',
        color: 'text-[#E53B52]',
      },
      backgroundColor: 'bg-[#105DE5]',
      images: {
        banner: '/sonic/banner.svg',
        hint: '/sonic/hint.svg',
      },
    },
  };

  const config = strategyConfig[strategyType] || strategyConfig['low-risk'];

  return (
    <div className={`relative px-24 py-10 ${config.backgroundColor}`}>
      {!showDepositForm ? (
        // 原 Morpho 組件的內容
        <>
          <img
            src={config.images.banner}
            className="h-10 mb-4 inline-block ml-0.5"
          />

          <div className="relative inline-block">
            <img
              src="/common/mark.svg"
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
                  src={config.images.hint}
                  alt="Hint"
                  style={{
                    maxWidth: 'none',
                    width: 'auto',
                    height: 'auto',
                  }}
                />
              </div>
            )}
          </div>

          <LinkBadge />
          <div className="space-y-4">
            <h1 className="text-[25px]">{config.text.title}</h1>
            <div className="flex flex-wrap items-center">
              <ApyBadge apy={config.text.apy} />

              <div
                className="flex items-center bg-black rounded-lg py-2 px-4 ml-3 h-10"
                style={{
                  textShadow: '-2px 1px 0px #000000',
                  fontFamily: 'Lilita One, cursive',
                  letterSpacing: '1%',
                }}>
                <span className={`text-[25px] ${config.risk.color}`}>
                  {config.risk.label}
                </span>
              </div>
            </div>
          </div>

          {/* 按鈕區域 */}
          <div className="mt-8 flex flex-col items-center gap-y-2">
            <img
              src="/common/chatbox.svg"
              onClick={() => openModal('chat')}
              className="h-16 ml-1.5 cursor-pointer"
            />
            <img
              src="/common/deposit.svg"
              onClick={() => setShowDepositForm(true)}
              className="h-16 cursor-pointer"
            />
          </div>
        </>
      ) : (
        // 原 Execution 組件的內容
        <>
          <section className="flex flex-col items-center justify-around min-h-[546px]">
            <h1 className="mb-8 text-[35px] text-center text-white max-sm:text-3xl [font-family:'Lilita_One',Helvetica] [text-shadow:2px_2px_0px_#000] [-webkit-text-stroke:1.5px_#000]">
              Ready to Deploy? Let&apos;s Lock It In!
            </h1>

            <div className="flex items-center justify-between w-full max-w-[800px] mb-10">
              <h2 className="text-[35px] text-white [font-family:'Lilita_One',Helvetica] [text-shadow:2px_2px_0px_#000] [-webkit-text-stroke:1.5px_#000]">
                {config.text.description}
              </h2>

              <div className="flex justify-end items-center gap-4">
                <ApyBadge apy={config.text.apy} />
                <div
                  className="flex items-center bg-black rounded-lg py-2 px-4 h-10"
                  style={{
                    textShadow: '-2px 1px 0px #000000',
                    fontFamily: 'Lilita One, cursive',
                    letterSpacing: '1%',
                  }}>
                  <span className={`text-[25px] ${config.risk.color}`}>
                    {config.risk.label}
                  </span>
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

            <p className="text-xl tracking-normal text-center text-white max-w-[654px] [font-family:'Lilita_One',Helvetica]">
              Once you confirm, your funds will be allocated automatically.
              <br />
              No extra steps—just sit back and let the AI optimize for you
            </p>

            {/* 執行按鈕 */}
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
                  src="/common/confirm.png"
                  onClick={() => console.log('execute')}
                  className="mt-10 h-16 cursor-pointer"
                />
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
