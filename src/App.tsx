import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './layout';
import { config } from './config';
import { Routes, Route } from 'react-router';
import { Group } from './pages/dev';
import { PopupProvider } from './contexts/PopupContext';

const queryClient = new QueryClient();

export default function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <PopupProvider>
            <Routes>
              <Route path="/" element={<Layout />} />
              <Route path="/dev" element={<Group />} />
            </Routes>
          </PopupProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
