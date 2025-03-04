import { sepolia, mainnet, arbitrum, base, baseSepolia } from 'wagmi/chains';
import { rainbowWeb3AuthConnector } from './RainbowWeb3authConnector';
import { rainbowWallet, metaMaskWallet } from '@rainbow-me/rainbowkit/wallets';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';

export const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: '04309ed1007e77d1f119b85205bb779d',
  chains: [mainnet, sepolia, arbitrum, base, baseSepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
  wallets: [
    {
      groupName: 'Recommended',
      wallets: [rainbowWallet, rainbowWeb3AuthConnector, metaMaskWallet],
    },
  ],
});
