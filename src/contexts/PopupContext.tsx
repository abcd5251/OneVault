import { createContext, useContext, useState, ReactNode } from 'react';
import { PopupType, PopupState, PopupContextValue } from '@/types';

// 創建 Context
const PopupContext = createContext<PopupContextValue | undefined>(undefined);

// Context Provider 組件
export function PopupProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PopupState>({
    activePopup: null,
    contextData: {},
  });

  // 打開彈窗函數
  const openPopup = (
    popup: PopupType,
    contextData: Record<string, any> = {},
  ) => {
    setState({
      activePopup: popup,
      contextData,
    });
  };

  // 關閉彈窗函數
  const closePopup = () => {
    setState({
      activePopup: null,
      contextData: {},
    });
  };

  return (
    <PopupContext.Provider value={{ state, openPopup, closePopup }}>
      {children}
    </PopupContext.Provider>
  );
}

// 自定義 Hook
export function usePopup(): PopupContextValue {
  const context = useContext(PopupContext);
  if (context === undefined) {
    throw new Error('usePopup must be used within a PopupProvider');
  }
  return context;
}
