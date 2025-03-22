import { PopupType } from '../types';

/**
 * 常見問題列表
 * 用於聊天機器人的預設問題
 */
export const COMMON_QUESTIONS = [
  {
    text: "How does Morpho's lending work?",
    value: "How does Morpho's lending work?",
  },
  {
    text: 'What makes the Gauntlet WETH Prime Vault different?',
    value: 'What makes the Gauntlet WETH Prime Vault different?',
  },
  {
    text: 'How is the 3.72% APY calculated?',
    value: 'How is the 3.72% APY calculated?',
  },
  {
    text: 'What risks should I be aware of?',
    value: 'What risks should I be aware of?',
  },
];

/**
 * UI 樣式常量
 * 彈窗的預設樣式設置
 */
export const POPUP_STYLES = {
  [PopupType.STRATEGY]: {
    container: 'bg-[#4c94fa]',
    content: 'flex flex-col',
  },
  [PopupType.CHAT]: {
    container: 'bg-[#4685f5] max-h-[80vh]',
    header: 'bg-transparent border-b-0',
    content: 'flex flex-col p-4',
  },
  [PopupType.NEWS]: {
    container: 'bg-[#2C3E50] max-w-[700px]',
    content: 'py-4',
  },
};
