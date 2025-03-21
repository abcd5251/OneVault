import { useState } from 'react';
import { useAccount } from 'wagmi';
import { toast } from 'react-toastify';
import { executeStrategyTransaction } from '../services/executionService';

export function useStrategyExecution() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { address } = useAccount();

  const executeStrategy = async (data: {
    deposit: { currency: string; amount: string };
  }) => {
    if (!address) {
      toast.error('Please connect your wallet');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await executeStrategyTransaction(
        address,
        data.deposit.amount,
        data.deposit.currency,
      );

      toast.success(
        `Transaction confirmed! Tx hash: ${result.transactionHash}`,
      );
    } catch (error) {
      toast.error('Transaction failed');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    executeStrategy,
    isSubmitting,
  };
}
