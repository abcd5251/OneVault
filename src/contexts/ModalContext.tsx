import { createContext, useContext, useState, ReactNode } from 'react';
import { ModalType, ModalState, ModalContextValue } from '@/types';

// 將 PopupContext 改為 ModalContext
const ModalContext = createContext<ModalContextValue | undefined>(undefined);

// 將 PopupProvider 改為 ModalProvider
export function ModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ModalState>({
    activeModal: null,
    contextData: {},
  });

  // 將 openPopup 改為 openModal
  const openModal = (
    modal: ModalType,
    contextData: Record<string, any> = {},
  ) => {
    setState({
      activeModal: modal,
      contextData,
    });
  };

  // 將 closePopup 改為 closeModal
  const closeModal = () => {
    setState({
      activeModal: null,
      contextData: {},
    });
  };

  return (
    <ModalContext.Provider value={{ state, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

// 將 usePopup 改為 useModal
export function useModal(): ModalContextValue {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
