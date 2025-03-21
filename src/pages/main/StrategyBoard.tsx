import { useState } from 'react';

import CustomRainbowKitConnectButton from '../../components/ui/CustomConnectButton';
import StrategyPopup from '../../components/StrategyBoard/StrategyPopup';
import ChatBox from '../../components/ChatBox';
import NewsPopup from '../../components/News/NewsPopup';

import {
  MidRisk,
  LowRisk,
  HighRisk,
} from '../../components/StrategyBoard/strategies';

export default function StrategyBoard() {
  const [showPopup, setShowPopup] = useState(false);
  const [showChatBox, setShowChatBox] = useState(false);
  const [showNews, setShowNews] = useState(false);

  return (
    <div className="relative bg-[url('/defi-background.png')] bg-cover bg-center bg-no-repeat h-screen w-full overflow-y-scroll">
      {/* HEADER */}
      <div className="absolute top-0 w-full flex z-50">
        <img src="stat-titles.png" className="object-contain w-96 h-auto" />
        <div className="ml-auto mr-3 mt-3">
          <CustomRainbowKitConnectButton />
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative flex items-center justify-center h-full flex-col">
        <div
          style={{ backgroundColor: 'rgba(10, 26, 107, 0.5)' }}
          className="w-[95vw] pl-3 mx-3 parallelogram relative pb-3">
          <div
            style={{ backgroundColor: 'rgba(10, 26, 107, 0.74)' }}
            className="relative pl-3">
            <h2
              style={{
                textShadow: '-5px 3px 0px #000000',
                WebkitTextFillColor: 'white',
                WebkitTextStroke: '2px black',
              }}
              className="text-white text-4xl uppercase text-center tracking-tighter py-1">
              Command Center
            </h2>
          </div>

          <div className="flex justify-between gap-x-2">
            <LowRisk />

            <MidRisk setShowPopup={setShowPopup} />

            <HighRisk />
          </div>
        </div>
      </div>

      {/* FOOTER, fixed at the bottom */}
      <div className="absolute bottom-0 w-full flex items-center justify-center pb-3">
        <div className="flex justify-center items-end gap-x-3 ml-2">
          <button
            onClick={() => {
              // TODO: Handle rewards click
              console.log('Rewards clicked');
            }}
            type="button"
            className="focus:outline-none">
            <img
              src="/btn-rewards.svg"
              className="h-24 w-auto object-contain hover:scale-105 transition-all duration-300"
              alt="Rewards"
            />
          </button>

          <button
            onClick={() => {
              // TODO: Handle quests click
              console.log('Quests clicked');
            }}
            type="button"
            className="focus:outline-none">
            <img
              src="/btn-quests.svg"
              className="h-24 w-auto object-contain hover:scale-105 transition-all duration-300"
              alt="Quests"
            />
          </button>

          <button
            onClick={() => {
              // TODO: Handle history click
              console.log('History clicked');
            }}
            type="button"
            className="focus:outline-none">
            <img
              src="/btn-history.svg"
              className="h-24 w-auto object-contain hover:scale-105 transition-all duration-300"
              alt="History"
            />
          </button>
        </div>
        <div className="ml-auto flex justify-center items-end gap-x-3 pr-3">
          <button
            onClick={() => {
              setShowNews(true);
              console.log('News clicked');
            }}
            type="button"
            className="focus:outline-none">
            <img
              src="/btn-news.svg"
              className="h-24 w-auto object-contain hover:scale-105 transition-all duration-300"
              alt="News"
            />
          </button>

          <button
            onClick={() => {
              setShowChatBox(true);
              console.log('AI Chat clicked');
            }}
            type="button"
            className="focus:outline-none">
            <img
              src="/btn-ai-chat.svg"
              className="h-20 w-auto object-contain hover:scale-105 transition-all duration-300"
              alt="AI Chat"
            />
          </button>
        </div>
      </div>

      <StrategyPopup
        isOpen={showPopup}
        setShowPopup={setShowPopup}
        setChatBox={setShowChatBox}
      />

      <ChatBox
        isOpen={showChatBox}
        setShowChatBox={setShowChatBox}
        setShowPopup={setShowPopup}
      />

      <NewsPopup isOpen={showNews} setShowNews={setShowNews} />
    </div>
  );
}
