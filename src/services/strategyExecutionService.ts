import { StrategyType } from '@/types';

// 執行結果介面
export interface ExecutionResult {
  success: boolean;
  transactionHash?: string;
  message?: string;
}

// 基礎策略執行類
class StrategyExecutor {
  async validate(amount: number): Promise<boolean> {
    // 基本驗證邏輯
    return amount > 0;
  }

  async execute(amount: number): Promise<ExecutionResult> {
    throw new Error('Method not implemented');
  }
}

// 低風險策略執行器
class LowRiskExecutor extends StrategyExecutor {
  async execute(amount: number): Promise<ExecutionResult> {
    console.log(`執行低風險策略，金額: ${amount}`);
    // 直接執行，無需額外確認
    return {
      success: true,
      transactionHash: '0x' + Math.random().toString(16).substr(2, 40),
      message: '低風險策略執行成功！',
    };
  }
}

// 中風險策略執行器
class MidRiskExecutor extends StrategyExecutor {
  async validate(amount: number): Promise<boolean> {
    const baseValidation = await super.validate(amount);
    // 中風險可能需要確保金額在特定範圍
    return baseValidation && amount <= 10000;
  }

  async execute(amount: number): Promise<ExecutionResult> {
    console.log(`執行中風險策略，金額: ${amount}`);
    // 可能需要更多的處理邏輯
    return {
      success: true,
      transactionHash: '0x' + Math.random().toString(16).substr(2, 40),
      message: '中風險策略執行成功！',
    };
  }
}

// 高風險策略執行器
class HighRiskExecutor extends StrategyExecutor {
  async validate(amount: number): Promise<boolean> {
    const baseValidation = await super.validate(amount);
    // 高風險可能需要更嚴格的驗證
    return baseValidation && amount <= 5000;
  }

  async execute(amount: number): Promise<ExecutionResult> {
    console.log(`執行高風險策略，金額: ${amount}，需要額外確認`);
    // 高風險可能需要額外的確認步驟
    return {
      success: true,
      transactionHash: '0x' + Math.random().toString(16).substr(2, 40),
      message: '高風險策略執行成功！請留意風險管理',
    };
  }
}

// 策略執行工廠
export const getStrategyExecutor = (type: StrategyType): StrategyExecutor => {
  switch (type) {
    case StrategyType.LOW_RISK:
      return new LowRiskExecutor();
    case StrategyType.MID_RISK:
      return new MidRiskExecutor();
    case StrategyType.HIGH_RISK:
      return new HighRiskExecutor();
    default:
      return new LowRiskExecutor();
  }
};
