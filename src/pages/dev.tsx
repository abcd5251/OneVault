import { ChevronRightIcon } from '@heroicons/react/24/solid';

export const Group = () => {
  return (
    <div className="bg-transparent flex flex-row justify-center w-full">
      <div className="overflow-x-hidden w-[1056px] h-[628px]">
        <div className="relative h-[628px]">
          {/* Main container */}
          <div className="absolute w-[1041px] h-[628px]">
            {/* Header */}
            <div className="w-full h-20 bg-[#248ef6] shadow-[inset_0px_-6.6px_0px_#055cb3] relative">
              {/* Group 990 text */}
              <div className="absolute left-6 top-4 text-white text-2xl font-['Lilita_One']">
                Group 990
              </div>

              {/* Title */}
              <div className="absolute left-1/2 -translate-x-1/2 top-4 flex items-center gap-2">
                <img src="/shield-icon.svg" alt="Shield" className="w-8 h-8" />
                <div className="[text-shadow:0px_3.88px_0px_#000000cc] [-webkit-text-stroke:1.94px_#000000] [font-family:'Lilita_One'] font-normal text-white text-[35.4px] tracking-[0.50px] leading-[normal] whitespace-nowrap">
                  SAFE
                </div>
              </div>

              {/* Close button */}
              <div className="absolute right-4 top-2 w-[81px] h-[55px] bg-[#ff6b6b] rounded-lg shadow-[inset_0px_-4px_0px_#d14343] cursor-pointer">
                <div className="flex items-center justify-center h-full">
                  <span className="text-white text-4xl font-['Lilita_One']">×</span>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="w-full h-[548px] bg-[#105de5] shadow-[inset_0px_-2.72px_0px_#00000040,0px_13.6px_0px_#248ef6,inset_0px_2.91px_0px_#063a97] pt-20">
              {/* Title */}
              <div className="text-center mb-12">
                <div className="[text-shadow:0px_3.88px_0px_#000000cc] [-webkit-text-stroke:1.94px_#000000] [font-family:'Lilita_One'] font-normal text-white text-[35px] tracking-[0.80px] leading-[normal] whitespace-nowrap">
                  Ready to Deploy? Let's Lock It In!
                </div>
              </div>

              {/* Strategy section */}
              <div className="mx-auto w-[914px] flex items-center justify-between">
                <div className="[text-shadow:0px_3.88px_0px_#000000cc] [-webkit-text-stroke:1.94px_#000000] [font-family:'Lilita_One'] font-normal text-white text-[35px] tracking-[0.80px] leading-[normal] whitespace-nowrap">
                  Shadow provide liquidity Strategy
                </div>

                <div className="flex items-center gap-4">
                  {/* APY Badge */}
                  <div className="relative flex items-center bg-[#1a1a1a] rounded-full h-[38px] pl-12 pr-4">
                    <img
                      className="absolute left-0 w-12 h-12"
                      alt="Heart icon"
                      src="/group-956.png"
                    />
                    <span className="[font-family:'Lilita_One'] text-white text-[25px]">
                      APY: <span className="text-[#c689ff]">134.9%</span>
                    </span>
                  </div>

                  {/* Risk Badge */}
                  <div className="bg-[#1a1a1a] rounded-full h-[38px] px-4 flex items-center">
                    <span className="[font-family:'Lilita_One'] text-[#ff3333] text-[25px]">
                      High Risk
                    </span>
                  </div>
                </div>
              </div>

              {/* Amount input section */}
              <div className="mt-12 mx-auto w-[562px]">
                <div className="[font-family:'Lilita_One'] text-white text-[21.4px] mb-2">
                  Amount to deploy
                </div>

                <div className="relative h-[60px] bg-[#0a87fe] rounded-lg shadow-[inset_0px_-4px_0px_#0461c0]">
                  <div className="absolute left-0 top-0 h-full w-[83px] flex items-center justify-center">
                    <img className="w-[50px] h-[50px]" alt="Token" src="/image-43.png" />
                  </div>
                  <ChevronRightIcon className="absolute left-[83px] top-1/2 -translate-y-1/2 w-6 h-6 text-white" />
                  <input
                    type="text"
                    placeholder="Select the amount of USDC or USDT to deploy.."
                    className="absolute left-[110px] top-0 h-full w-[calc(100%-110px)] bg-transparent text-[#ffffff7a] [font-family:'Lilita_One'] text-[21.4px] focus:outline-none"
                  />
                </div>
              </div>

              {/* Confirmation text */}
              <div className="mx-auto mt-16 text-center max-w-[654px]">
                <div className="[font-family:'Lilita_One'] text-white text-[25px] leading-[40px]">
                  Once you confirm, your funds will be allocated automatically.
                  <br />
                  No extra steps—just sit back and let the AI optimize for you
                </div>
              </div>

              {/* Confirm button */}
              <button className="mx-auto mt-10 block w-[482px] h-[82px] bg-[#248ef6] rounded-lg shadow-[inset_0px_-6px_0px_#0461c0] hover:brightness-110 transition-all">
                <div className="[text-shadow:0px_4.02px_0px_#000000] [-webkit-text-stroke:1.34px_#000000] [font-family:'Lilita_One'] text-white text-[35px] tracking-[0.35px] flex items-center justify-center gap-2">
                  🚀 CONFIRM & DEPLOY
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
