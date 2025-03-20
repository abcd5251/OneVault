import { useAccount } from 'wagmi';
import WelcomeScreen from './pages/main/WelcomeScreen';
import DefiScreen from './pages/main/StrategyBoard';

import { useState } from 'react';

export default function Layout() {
  const [isDeposited, setIsDeposited] = useState(true); //! mock TRUE
  const { address } = useAccount();

  if (address && isDeposited) {
    return <DefiScreen />;
  } else {
    // wallet not connected.
    return <WelcomeScreen setIsDeposited={setIsDeposited} />;
  }
}
