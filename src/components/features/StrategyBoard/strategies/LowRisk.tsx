import { useModal } from '@/contexts/ModalContext';
import { ModalType, StrategyType } from '@/types';

// 保留向後兼容的 props 類型
export function LowRisk({
  setShowPopup,
}: {
  setShowPopup?: (show: boolean) => void;
}) {
  const { openModal } = useModal();

  const handleClick = () => {
    // 如果提供了舊式 prop，則調用
    if (setShowPopup) {
      setShowPopup(true);
    }
    // 使用 Context 方法
    openModal(ModalType.STRATEGY, { strategyType: StrategyType.LOW_RISK });
  };

  return (
    <div
      onClick={handleClick}
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
      <div className="bg-[url('/main/defi-background.png')] object-contain h-32 w-full" />
    </div>
  );
}
