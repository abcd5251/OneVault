import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { usePopup } from '@/contexts/PopupContext';
import Modal from '@/components/ui/Modal';
import StrategyContent from './StrategyContent';

export default function StrategyPopup() {
  const { state, closePopup } = usePopup();
  const isVisible = state.activePopup === 'strategy';
  const [showDepositForm, setShowDepositForm] = useState(false);

  // 從 context 數據獲取策略類型
  const strategyType = state.contextData?.strategyType || 'low-risk';

  // 根據策略類型確定標題和圖標
  const getStrategyInfo = (type: string) => {
    switch (type) {
      case 'low-risk':
        return { title: 'SAFE HARBOR', icon: '🛡️' };
      case 'mid-risk':
        return { title: 'BALANCED', icon: '⚖️' };
      case 'high-risk':
        return { title: 'HIGH STAKES', icon: '🚀' };
      default:
        return { title: 'SAFE HARBOR', icon: '🛡️' };
    }
  };

  const { title, icon } = getStrategyInfo(strategyType);

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
