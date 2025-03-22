/**
 * 策略類型枚舉
 * 用於標識不同風險等級的策略
 */
export enum StrategyType {
  LOW_RISK = 'low-risk',
  MID_RISK = 'mid-risk',
  HIGH_RISK = 'high-risk',
}

/**
 * 策略內容屬性
 * 定義策略組件需要的配置信息
 */
export interface StrategyConfig {
  text: {
    icon: string;
    title: string;
    description: string;
    apy: string;
  };
  risk: {
    label: string;
    color: string;
  };
  backgroundColor: string;
  images: {
    banner: string;
    hint: string;
  };
}
