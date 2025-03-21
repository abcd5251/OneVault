import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import Morpho from '../Morpho';
import Execution from './Execution';

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
  const [showDepositForm, setShowDepositForm] = useState(false);

  const handleChatBox = () => {
    setChatBox(true);
    setShowPopup(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-gray-900/80 absolute t-0 left-0 w-full h-full z-0"></div>
        <div className="bg-[#4c94fa] text-white rounded-xl shadow-lg p-6 w-[90vw] max-w-[900px] z-10 relative border-4 border-blue-900">
          {/* Header */}
          <div className="flex justify-center items-center border-b border-white pb-2 relative -mt-2">
            {showDepositForm && (
              <button
                onClick={() => setShowDepositForm(false)}
                className="absolute left-0 flex items-center text-white hover:text-blue-200">
                <img
                  src="/AIChat/back.svg"
                  className="h-10 left-2 top-2 cursor-pointer"
                />
              </button>
            )}
            <div className="-mb-1 flex items-center">
              <span className="text-3xl inline-flex items-center">🛡️</span>
              <h2 className="[text-shadow:0px_3.88px_0px_#000000cc] [-webkit-text-stroke:1.94px_#000000] [font-family:'Lilita One',Helvetica] font-normal text-white text-[35.41px] tracking-[1.4%]">
                SAFE HARBOR
              </h2>
            </div>
            <img
              src="/morpho/cancel.svg"
              className="h-10 absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPopup(false)}
            />
          </div>

          {/* Body */}
          {!showDepositForm ? (
            <Morpho
              handleChatBox={handleChatBox}
              setShowDepositForm={setShowDepositForm}
            />
          ) : (
            <Execution />
          )}
        </div>
        <ToastContainer position="bottom-right" />
      </div>
    </>
  );
}
