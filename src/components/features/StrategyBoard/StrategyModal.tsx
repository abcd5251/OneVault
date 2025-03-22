import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { useModal } from '@/contexts/ModalContext';
import Modal from '@/components/ui/Modal';
import StrategyContent from './StrategyContent';
import { StrategyType, ModalType } from '@/types';
import { STRATEGY_DISPLAY_INFO } from '@/constants';

export default function StrategyModal() {
  const { state, closeModal } = useModal();
  const isVisible = state.activeModal === ModalType.STRATEGY;
  const [showDepositForm, setShowDepositForm] = useState(false);

  // 從 context 數據獲取策略類型
  const strategyType = state.contextData?.strategyType || StrategyType.LOW_RISK;

  // 獲取當前策略顯示信息
  const { title, icon } =
    STRATEGY_DISPLAY_INFO[strategyType as StrategyType] || // TODO: fix deposit in StrategyType
    STRATEGY_DISPLAY_INFO[StrategyType.LOW_RISK];

  return (
    <>
      <Modal
        isVisible={isVisible}
        onClose={closeModal}
        title={title}
        icon={icon}
        showBackButton={showDepositForm}
        onBack={() => setShowDepositForm(false)}
        showToast={true}>
        <StrategyContent
          strategyType={strategyType as StrategyType}
          showDepositForm={showDepositForm}
          setShowDepositForm={setShowDepositForm}
        />
      </Modal>
      <ToastContainer position="bottom-right" />
    </>
  );
}
