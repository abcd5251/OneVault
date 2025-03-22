/**
 * 彈窗類型枚舉
 * 用於標識不同類型的彈窗
 */
export enum ModalType {
  STRATEGY = 'strategy',
  CHAT = 'chat',
  NEWS = 'news',
}

/**
 * 彈窗上下文狀態
 */
export interface ModalState {
  activeModal: ModalType | null;
  contextData?: Record<string, unknown>;
}

/**
 * 彈窗上下文值
 */
export interface ModalContextValue {
  state: ModalState;
  openModal: (modal: ModalType, contextData?: Record<string, unknown>) => void;
  closeModal: () => void;
}

/**
 * 消息類型
 * 用於聊天功能
 */
export interface Message {
  text: string;
  isUser: boolean;
}

/**
 * Modal 組件 Props
 */
export interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string | React.ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  showToast?: boolean;
  customStyles?: {
    container?: string;
    header?: string;
    content?: string;
  };
}
