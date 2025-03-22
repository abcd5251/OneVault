import { Address, Chain } from 'viem';
import { base, baseSepolia } from 'viem/chains';

// TODO: replace it
const EXECUTOR = '0x4Aa2cD94921a7649b4c35F9dBbEAA3f542533560';
const VAULT = '0xDC207f2D240C2bF3bbFEE32B488F7C463B1E6237';
const USDC = '0x036CbD53842c5426634e7929541eC2318f3dCF7e';
const USDC_DECIMAL = 6;

const MORPHO_BLUE = '0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb';
const MORPHO_WETH_USDC_MARKET =
  '0xe36464b73c0c39836918f7b2b9a6f1a8b70d7bb9901b38f29544d9b96119862e';

export const PERMIT_EXPIRY = 60000;

export const CHAINS: Record<number, Chain> = {
  [base.id]: base,
  [baseSepolia.id]: baseSepolia,
};

export type SupportedChain = keyof typeof CHAINS;

export type Contracts = {
  executor: Address;
  vault: Address;
  tokens: {
    usdc: { address: Address; decimal: number };
  };
  morpho: {
    blue: Address;
    wethUsdcMarket: Address;
  };
};

export const CONTRACTS: Record<SupportedChain, Contracts> = {
  [base.id]: {
    executor: EXECUTOR,
    vault: VAULT,
    tokens: {
      usdc: {
        address: USDC,
        decimal: USDC_DECIMAL,
      },
    },
    morpho: {
      blue: MORPHO_BLUE,
      wethUsdcMarket: MORPHO_WETH_USDC_MARKET,
    },
  },

  [baseSepolia.id]: {
    executor: EXECUTOR,
    vault: VAULT,
    tokens: {
      usdc: {
        address: USDC,
        decimal: USDC_DECIMAL,
      },
    },
    morpho: {
      blue: MORPHO_BLUE,
      wethUsdcMarket: MORPHO_WETH_USDC_MARKET,
    },
  },
};
