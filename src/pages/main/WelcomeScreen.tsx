import { useState, Dispatch, SetStateAction } from 'react';
import OnboardingModal from '@/components/features/OnboardingModal';

interface Props {
  setIsDeposited: Dispatch<SetStateAction<boolean>>;
}

export default function WelcomeScreen({ setIsDeposited }: Props) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="relative bg-[url('/background.png')] bg-cover bg-center bg-no-repeat h-screen w-full overflow-y-scroll">
      <div className="relative flex items-center justify-center h-full flex-col">
        <img src="/victory.png" className="w-56 h-40 object-contain" />
        <h1
          style={{
            textShadow: ' -5px 3px 0px #000000',
            WebkitTextFillColor: 'white',
            WebkitTextStroke: '2px black',
          }}
          className="uppercase text-6xl md:text-8xl italic tracking-tighter">
          One Vault
        </h1>
        <h3
          style={{
            textShadow: ' -1px 4px 0px #000000',
            WebkitTextFillColor: 'white',
            WebkitTextStroke: '1px black',
          }}
          className="uppercase text-white text-xl md:text-3xl tracking-tighter">
          your personal defi assistant
        </h3>
        {/* BUTTON */}
        <button
          type="button"
          onClick={() => setOpenModal(true)}
          style={{ boxShadow: '-1px 4px 0px 0px #000000' }}
          className="parallelogram border-2 border-black border-solid bg-background-yellow py-4 px-20 uppercase text-white text-2xl tracking-tighter rounded-sm mt-5 cursor-pointer">
          <span>Start</span>
        </button>
        {openModal && (
          <OnboardingModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            setIsDeposited={setIsDeposited}
          />
        )}
      </div>
    </div>
  );
}
