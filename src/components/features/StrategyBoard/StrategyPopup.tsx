import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { usePopup } from '@/contexts/PopupContext';
import Modal from '@/components/ui/Modal';
import StrategyContent from './StrategyContent';
import { StrategyType } from '@/types';
import { STRATEGY_DISPLAY_INFO } from '@/constants';
import { PopupType } from '@/types';

export default function StrategyPopup() {
  const { state, closePopup } = usePopup();
  const isVisible = state.activePopup === PopupType.STRATEGY;
  const [showDepositForm, setShowDepositForm] = useState(false);

  // 從 context 數據獲取策略類型
  const strategyType = state.contextData?.strategyType || StrategyType.LOW_RISK;

  // 獲取當前策略顯示信息
  const { title, icon } =
    STRATEGY_DISPLAY_INFO[strategyType as StrategyType] ||
    STRATEGY_DISPLAY_INFO[StrategyType.LOW_RISK];

  return (
    <>
      <Modal
        isVisible={isVisible}
        onClose={closePopup}
        title={title}
        icon={icon}
        showBackButton={showDepositForm}
        onBack={() => setShowDepositForm(false)}
        showToast={true}>
        <StrategyContent
          strategyType={strategyType}
          showDepositForm={showDepositForm}
          setShowDepositForm={setShowDepositForm}
        />
      </Modal>
      <ToastContainer position="bottom-right" />
    </>
  );
}
