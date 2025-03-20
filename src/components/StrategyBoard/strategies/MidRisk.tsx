import React, { useState } from 'react';

import StrategyPopup from '../StrategyBoard/StrategyPopup';

// interface MidRiskProps {
//   setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
// }

export function MidRisk({
  setShowPopup,
}: {
  setShowPopup: (show: boolean) => void;
}) {
  return (
    <div
      onClick={() => setShowPopup(true)}
      className="w-1/3 border-2 border-black cursor-pointer hover:scale-105 transition-all duration-300">
      <div className="text-right text-[#7583A4] bg-black">
        <p>Mid-Risk Strategy</p>
      </div>
      <div
        style={{
          textShadow: ' -1.5px 1px 0px #000000',
          WebkitTextFillColor: 'white',
          WebkitTextStroke: '1.2px black',
        }}
        className="bg-[#9C3EF4] text-white pl-3">
        <div className="flex items-center py-2">
          <div className="text-5xl mr-3">⚖️️</div>
          <div>
            <p className="uppercase text-3xl">Balanced</p>
            <p className="uppercase text-2xl">OPTIMIZED YIELD</p>
          </div>
        </div>
      </div>
      <div className="bg-[url('/balanced.png')] object-contain h-32 w-full" />
    </div>
  );
}
