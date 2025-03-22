import { useState, useEffect } from 'react';
import { usePopup } from '@/contexts/PopupContext';
import Modal from '@/components/ui/Modal';

export default function NewsPopup() {
  const [isLoading, setIsLoading] = useState(true);

  // 完全使用 Context
  const { state, closePopup } = usePopup();

  // 只使用 Context 的顯示狀態
  const isVisible = state.activePopup === 'news';

  useEffect(() => {
    if (isVisible) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000); // 3秒後切換顯示內容
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  // 使用自定義樣式來適應新聞界面
  const customStyles = {
    container: 'bg-[#2C3E50] max-w-[700px]',
    content: 'py-4',
  };

  return (
    <Modal
      isVisible={isVisible}
      onClose={closePopup}
      title="Latest DeFi News"
      icon="📰"
      customStyles={customStyles}>
      {/* 這裡保留原有 NewsPopup 的內容區域，但移除外層結構 */}
      <div className="p-4">
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-blue-700 p-4 rounded-lg">
              <h2 className="font-bold">Morpho Labs Raises $100M</h2>
              <p className="text-sm">
                Morpho Labs has secured $100 million in a Series B funding round
                to further develop its lending optimization protocol.
              </p>
            </div>
            <div className="bg-blue-700 p-4 rounded-lg">
              <h2 className="font-bold">
                New Yield Strategies Outperform Market
              </h2>
              <p className="text-sm">
                Our AI-powered DeFi strategies have outperformed the market by
                23% this quarter, setting new standards for automated yield
                farming.
              </p>
            </div>
            <div className="bg-blue-700 p-4 rounded-lg">
              <h2 className="font-bold">Security Update</h2>
              <p className="text-sm">
                All smart contracts have passed rigorous audits by leading
                security firms, ensuring maximum safety for your funds.
              </p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
