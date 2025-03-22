import { useState, useEffect } from 'react';
import { usePopup } from '@/contexts/PopupContext';

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

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-gray-900/80 absolute top-0 left-0 w-full h-full z-0"></div>
        <div className="bg-[#1E90FF] text-white rounded-lg shadow-lg p-6 w-[90vw] max-w-[600px] max-h-[600px] flex flex-col z-10 relative">
          {/* Header */}
          <div className="w-full flex items-center justify-between p-4">
            <img
              src="/News/topic.svg"
              className="h-10 absolute right-55 top-2"
            />
            <img
              src="/morpho/cancel.svg"
              className="h-10 absolute -right-2 top-2 cursor-pointer"
              onClick={closePopup}
            />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : (
              <>
                <h1 className="text-xl font-bold mb-4">Latest DeFi News</h1>
                <div className="space-y-4">
                  <div className="bg-blue-700 p-4 rounded-lg">
                    <h2 className="font-bold">Morpho Labs Raises $100M</h2>
                    <p className="text-sm">
                      Morpho Labs has secured $100 million in a Series B funding
                      round to further develop its lending optimization
                      protocol.
                    </p>
                  </div>
                  <div className="bg-blue-700 p-4 rounded-lg">
                    <h2 className="font-bold">
                      New Yield Strategies Outperform Market
                    </h2>
                    <p className="text-sm">
                      Our AI-powered DeFi strategies have outperformed the
                      market by 23% this quarter, setting new standards for
                      automated yield farming.
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
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
