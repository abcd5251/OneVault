export function serializeAmount(amount: string, decimal: number) {
  const floatAmount = parseFloat(amount);
  if (isNaN(floatAmount)) {
    throw new Error('Amount must be a valid number.');
  }

  const integerAmount = Math.floor(floatAmount * decimal);
  return BigInt(integerAmount);
}
