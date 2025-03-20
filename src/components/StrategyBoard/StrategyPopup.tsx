import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Supply from './Execution';

interface StrategyPopupProps {
  isOpen: boolean;
  setChatBox: (show: boolean) => void;
  setShowPopup: (show: boolean) => void;
}

export default function StrategyPopup({
  isOpen,
  setChatBox,
  setShowPopup,
}: StrategyPopupProps) {
  const [showMorpho, setShowMorpho] = useState(false);
  const [showDepositForm, setShowDepositForm] = useState(false);

  const handleAIStrategyClick = () => {
    setChatBox(true);
    setShowPopup(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-gray-900/80 absolute t-0 left-0 w-full h-full z-0"></div>
        <div className="bg-[#1E90FF] text-white rounded-lg shadow-lg p-6 w-[90vw] max-w-[600px] z-10 relative">
          <div className="flex justify-center items-center border-b border-white pb-2 relative -mt-2">
            {showDepositForm && (
              <button
                onClick={() => setShowDepositForm(false)}
                className="absolute left-0 flex items-center text-white hover:text-blue-200">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"></path>
                </svg>
                <span>Back</span>
              </button>
            )}
            <div className="items-center -mb-1 flex ">
              <span className="text-3xl inline-flex items-center">🛡️</span>
              <img
                src="/morpho/eventInfo.svg"
                className="h-6 ml-1 inline-block align-middle"
              />
            </div>
            <img
              src="/morpho/cancel.svg"
              className="h-10 absolute right-2 -top-2 cursor-pointer"
              onClick={() => setShowPopup(false)}
            />
          </div>

          {/* Body */}
          {!showDepositForm ? (
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
              <a>
                <img src="/morpho/intro.svg" className="h-40 " />
                <div className="flex flex-col items-center gap-y-2">
                  <img
                    src="/morpho/AiButton.svg"
                    onClick={handleAIStrategyClick}
                    className="h-16 ml-1.5 cursor-pointer"
                  />
                  <img
                    src="/morpho/deposit.svg"
                    onClick={() => setShowDepositForm(true)}
                    className="h-16 cursor-pointer"
                  />
                </div>
              </a>
            </div>
          ) : (
            <Supply />
          )}
        </div>
        <ToastContainer position="bottom-right" />
      </div>
    </>
  );
}
