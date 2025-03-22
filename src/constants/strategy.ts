import { StrategyType, StrategyConfig } from '../types';

/**
 * 策略顯示信息映射
 * 用於獲取不同策略類型的顯示信息
 */
export const STRATEGY_DISPLAY_INFO = {
  [StrategyType.LOW_RISK]: {
    title: 'SAFE HARBOR',
    icon: '🛡️',
  },
  [StrategyType.MID_RISK]: {
    title: 'BALANCED',
    icon: '⚖️',
  },
  [StrategyType.HIGH_RISK]: {
    title: 'HIGH STAKES',
    icon: '🚀',
  },
};

/**
 * 策略配置
 * 各種策略的完整配置信息
 */
export const STRATEGY_CONFIG: Record<StrategyType, StrategyConfig> = {
  [StrategyType.LOW_RISK]: {
    text: {
      icon: '🛡️',
      title: 'Use Gauntlet WETH Prime Vault in Morpho to earn steady returns',
      description: 'Low Risk Strategy',
      apy: '3.72%',
    },
    risk: {
      label: 'Low Risk',
      color: 'text-[#33FF6C]',
    },
    backgroundColor: 'bg-[#105DE5]',
    images: {
      banner: '/morpho/banner.svg',
      hint: '/morpho/hint.svg',
    },
  },
  [StrategyType.MID_RISK]: {
    text: {
      icon: '⚖️',
      title:
        'Use Balanced Yield Strategy to optimize returns with moderate risk',
      description: 'Balanced Strategy',
      apy: '8.45%',
    },
    risk: {
      label: 'Mid Risk',
      color: 'text-[#9C3EF4]',
    },
    backgroundColor: 'bg-[#105DE5]',
    images: {
      banner: '/morpho/banner.svg',
      hint: '/morpho/hint.svg',
    },
  },
  [StrategyType.HIGH_RISK]: {
    text: {
      icon: '🚀',
      title:
        'Sonic-native concentrated liquidity exchange. The ultimate trading hub on Sonic.',
      description: 'Shadow Strategy',
      apy: '134.9%',
    },
    risk: {
      label: 'High Risk',
      color: 'text-[#E53B52]',
    },
    backgroundColor: 'bg-[#105DE5]',
    images: {
      banner: '/sonic/banner.svg',
      hint: '/sonic/hint.svg',
    },
  },
};
