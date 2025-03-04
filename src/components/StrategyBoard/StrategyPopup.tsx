import React, { useState } from 'react';


interface StrategyPopupProps {
  isOpen: boolean;
  onClose: () => void;
  setShowAIStrategy: (show: boolean) => void;
  setShowPopup: (show: boolean) => void;
  setShowStake: (show: boolean) => void;
}

export default function StrategyPopup({ isOpen, onClose, setShowAIStrategy, setShowPopup, setShowStake }: StrategyPopupProps) {
  const [showMorpho, setShowMorpho] = useState(false);
  const handleAIStrategyClick = () => {
    setShowAIStrategy(true);
    setShowPopup(false);

  };
  const handleExecuteClick = () => {
    setShowStake(true);
    setShowPopup(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0  flex items-center justify-center z-50">
        <div className='bg-gray-900/80 absolute t-0 left-0 w-full h-full z-0'></div>
          <div className="bg-[#1E90FF] text-white rounded-lg shadow-lg p-6 w-[90vw] max-w-[600px] z-10 relative">
            {/* Header */}
            <div className="flex justify-center items-center border-b border-white pb-2">
              <div className='items-center' >
              <span className='text-3xl inline-block'>🛡️</span>
              <img 
                src="/morpho/eventInfo.svg" 
                className="h-6 inline-block"
              />
              </div>
              <img 
                src="/morpho/cancel.svg" 
                className="h-10 absolute -right-2 top-2 cursor-pointer"
                onClick={onClose}
              />
            </div>

            {/* Body */}
            <div className="mt-4 relative">
              <img 
              src="/morpho/Morpho.svg" 
              className="h-10 mb-4 inline-block"
              />
              <img 
              src="/morpho/mark.svg" 
              className="h-8 mb-4 ml-2 inline-block cursor-pointer"
              onClick={() => setShowMorpho(!showMorpho)}
              />
              {showMorpho && (
                <img 
                src="/morpho/morphoShow.svg" 
                className="absolute -top-48 right-6 "
                />
              )}
              <a
                href="https://app.morpho.org/vault/?vault=897a21a1-45">
                <img 
                  src="/morpho/intro.svg" 
                  className="h-40 "
                  />
              </a>

              {/* Action Section */}
              <div className="flex flex-col items-center gap-y-2">
                <img
                  src="/morpho/AiButton.svg"
                  onClick={handleAIStrategyClick}
                  className="h-16 ml-1.5 cursor-pointer"
                />
                 <img
                  src="/morpho/deposit.svg"
                  onClick={handleExecuteClick}
                  className="h-16 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
    </>
  );
}