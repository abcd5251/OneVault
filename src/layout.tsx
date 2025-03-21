import { useAccount } from 'wagmi';
import WelcomeScreen from './pages/main/WelcomeScreen';
import StrategyBoard from './pages/main/StrategyBoard';

import { useState } from 'react';

export default function Layout() {
  const [isDeposited, setIsDeposited] = useState(true); //! mock TRUE
  const { address } = useAccount();

  if (address && isDeposited) {
    return <StrategyBoard />;
  } else {
    // wallet not connected.
    return <WelcomeScreen setIsDeposited={setIsDeposited} />;
  }
}
