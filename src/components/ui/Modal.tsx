import React, { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

type ModalProps = {
  isVisible: boolean;
  onClose: () => void;
  title?: string | ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
  children: ReactNode;
  icon?: ReactNode;
  showToast?: boolean;
  customStyles?: {
    container?: string;
    header?: string;
    content?: string;
  };
};

export default function Modal({
  isVisible,
  onClose,
  title,
  showBackButton = false,
  onBack,
  children,
  icon,
  showToast = false,
  customStyles = {},
}: ModalProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* 背景遮罩 */}
      <div className="bg-gray-900/80 absolute top-0 left-0 w-full h-full z-0"></div>

      {/* 內容容器 */}
      <div
        className={`bg-[#4c94fa] text-white rounded-xl shadow-lg p-6 w-[90vw] max-w-[900px] z-10 relative border-4 border-blue-900 ${customStyles.container || ''}`}>
        {/* 標題區域 */}
        {(title || showBackButton) && (
          <div
            className={`flex justify-center items-center border-b border-white pb-2 relative -mt-2 ${customStyles.header || ''}`}>
            {showBackButton && (
              <button
                onClick={onBack}
                className="absolute left-0 flex items-center text-white hover:text-blue-200">
                <img
                  src="/common/back.svg"
                  className="h-10 left-2 top-2 cursor-pointer"
                />
              </button>
            )}

            {title && (
              <div className="-mb-1 flex items-center">
                {icon && (
                  <span className="text-3xl inline-flex items-center">
                    {icon}
                  </span>
                )}
                {typeof title === 'string' ? (
                  <h2 className="[text-shadow:0px_3.88px_0px_#000000cc] [-webkit-text-stroke:1.94px_#000000] [font-family:'Lilita One',Helvetica] font-normal text-white text-[35.41px] tracking-[1.4%]">
                    {title}
                  </h2>
                ) : (
                  title
                )}
              </div>
            )}

            <img
              src="/common/cancel.svg"
              className="h-10 absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={onClose}
            />
          </div>
        )}

        {/* 內容區域 */}
        <div className={customStyles.content || ''}>{children}</div>

        {/* 通知區域 */}
        {showToast && <ToastContainer position="bottom-right" />}
      </div>
    </div>
  );
}
