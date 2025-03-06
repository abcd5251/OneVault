//! Now only base on base sepolia
import type { TypedData } from 'viem';

export const EXECUTOR = '0x4Aa2cD94921a7649b4c35F9dBbEAA3f542533560';
export const VAULT = '0xDC207f2D240C2bF3bbFEE32B488F7C463B1E6237';
export const USDC = '0x036CbD53842c5426634e7929541eC2318f3dCF7e';
export const USDC_DECIMAL = 10e5;

export const MORPHO_BLUE = '0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb';
export const MORPHO_WETH_USDC_MARKET =
  '0xe36464b73c0c39836918f7b2b9a6f1a8b70d7bb9901b38f29544d9b96119862e';

export const TYPES = {
  Permit: [
    { name: 'owner', type: 'address' },
    { name: 'spender', type: 'address' },
    { name: 'value', type: 'uint256' },
    { name: 'nonce', type: 'uint256' },
    { name: 'deadline', type: 'uint256' },
  ],
} as const satisfies TypedData;

export const PERMIT_EXPIRY = 60000;
