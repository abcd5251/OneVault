import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAccount, useChainId } from 'wagmi';

import { useModal } from '@/contexts/ModalContext';
import ApyBadge from '@/components/ui/ApyBadge';
import LinkBadge from '@/components/ui/LinkBadge';
import CurrencyInput from '@/components/ui/CurrencyInput';
import { StrategyType, ModalType } from '@/types';
import { STRATEGY_CONFIG } from '@/constants';
import { getStrategyExecutor } from '@/services/strategyExecutionService';

type StrategyContentProps = {
  strategyType?: StrategyType;
  showDepositForm: boolean;
  setShowDepositForm: (show: boolean) => void;
};

export default function StrategyContent({
  strategyType = StrategyType.LOW_RISK,
  showDepositForm,
  setShowDepositForm,
}: StrategyContentProps) {
  const { address } = useAccount();
  const chainId = useChainId();

  const [showMorpho, setShowMorpho] = useState(false);
  const [amount, setAmount] = useState(0);
  const [isExecuting, setIsExecuting] = useState(false);
  const { openModal } = useModal();

  const config =
    STRATEGY_CONFIG[strategyType] || STRATEGY_CONFIG[StrategyType.LOW_RISK];

  const executor = getStrategyExecutor(chainId, strategyType);

  const handleExecuteStrategy = async () => {
    if (!amount || amount <= 0) {
      toast.error('請輸入有效金額');
      return;
    }

    setIsExecuting(true);

    console.log('Amount', amount);

    try {
      const isValid = await executor.validate(amount);
      if (!isValid) {
        toast.error('金額驗證失敗，請檢查輸入');
        setIsExecuting(false);
        return;
      }

      if (strategyType === StrategyType.HIGH_RISK) {
        const confirmed = window.confirm(
          '警告：這是高風險策略，可能導致較大資金損失。確定要繼續嗎？',
        );
        if (!confirmed) {
          setIsExecuting(false);
          return;
        }
      }

      const result = await executor.execute(address!, amount.toString());

      if (result.success) {
        toast.success(result.message || '策略執行成功');
      } else {
        toast.error(result.message || '策略執行失敗');
      }
    } catch (error) {
      console.error('執行策略時發生錯誤:', error);
      toast.error('執行過程中發生錯誤');
    } finally {
      setIsExecuting(false);
    }
  };

  const handleAmountChange = (value: number) => {
    setAmount(value);
  };

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
              onClick={() => openModal(ModalType.CHAT)}
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
                <CurrencyInput onChange={handleAmountChange} />
              </div>
            </div>

            <p className="text-xl tracking-normal text-center text-white max-w-[654px] [font-family:'Lilita_One',Helvetica]">
              Once you confirm, your funds will be allocated automatically.
              <br />
              No extra steps—just sit back and let the AI optimize for you
            </p>

            {/* 執行按鈕 - 整合執行服務 */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div
                  className="absolute inset-0 bg-blue-900"
                  style={{
                    transform: 'skew(-15deg) translateY(4px)',
                    width: '100%',
                    height: '100%',
                    zIndex: -1,
                  }}></div>

                <img
                  src="/common/confirm.png"
                  onClick={handleExecuteStrategy}
                  className={`mt-10 h-16 cursor-pointer ${isExecuting ? 'opacity-50' : ''}`}
                />

                {isExecuting && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white"></div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
