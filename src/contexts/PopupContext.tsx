import React, { createContext, useContext, useState, ReactNode } from 'react';

// 定義彈窗類型
export type PopupType = 'strategy' | 'chat' | 'news' | null;

// Context 狀態結構
export interface PopupState {
  activePopup: PopupType;
  contextData?: any; // 可選的彈窗數據
}

// Context 操作方法
export interface PopupContextType {
  state: PopupState;
  openPopup: (type: PopupType, data?: any) => void;
  closePopup: () => void;
  togglePopup: (type: PopupType, data?: any) => void;
}

// 創建 Context
const PopupContext = createContext<PopupContextType | undefined>(undefined);

// Props 類型定義
interface PopupProviderProps {
  children: ReactNode;
}

// Context Provider 組件
export const PopupProvider: React.FC<PopupProviderProps> = ({ children }) => {
  // 初始化狀態
  const [state, setState] = useState<PopupState>({
    activePopup: null,
    contextData: undefined,
  });

  // 打開彈窗方法
  const openPopup = (type: PopupType, data?: any) => {
    console.log(`Opening popup: ${type}`, data);
    setState({
      activePopup: type,
      contextData: data,
    });
  };

  // 關閉彈窗方法
  const closePopup = () => {
    console.log('Closing popup');
    setState({
      activePopup: null,
      contextData: undefined,
    });
  };

  // 切換彈窗方法
  const togglePopup = (type: PopupType, data?: any) => {
    console.log(`Toggling popup: ${type}`, data);
    setState((prevState) => {
      if (prevState.activePopup === type) {
        return {
          activePopup: null,
          contextData: undefined,
        };
      } else {
        return {
          activePopup: type,
          contextData: data,
        };
      }
    });
  };

  // 提供 Context 給子組件
  return (
    <PopupContext.Provider
      value={{ state, openPopup, closePopup, togglePopup }}>
      {children}
    </PopupContext.Provider>
  );
};

// 自定義 Hook，方便使用 Context
export const usePopup = () => {
  const context = useContext(PopupContext);
  if (context === undefined) {
    throw new Error('usePopup must be used within a PopupProvider');
  }
  return context;
};
