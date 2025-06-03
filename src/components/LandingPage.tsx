import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PopUpModal from '../components/PopUpModal';
import ParticlesBackground from './ParticlesBackground';

const LandingPage: React.FC = () => {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');

  const handleNavigate = (route: string) => {
    router.push(route);
  };

  return (
    <div className="relative min-h-screen w-full">
      <ParticlesBackground />
      <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 text-white font-poppins bg-transparent relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-7xl sm:text-8xl text-white animate-fadeInUp">
            <span className="font-bold">Locked</span>
            <span className="font-normal">In</span>
          </h1>
          <p className="mt-4 text-lg font-inter italic text-gray-300 max-w-xl mx-auto">
            A minimalist, distraction-free timer designed to help you focus better. Choose a session, start your timer, and train your mind — one cycle at a time.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => {
              setPopupTitle('OG Pomodoro');
              setIsPopupOpen(true);
            }}
            className="bg-dark text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-white hover:text-primary transition"
          >
            OG POMODORO
          </button>
          <button
            onClick={() => {
              setPopupTitle('Short Study Session');
              setIsPopupOpen(true);
            }}
            className="bg-dark text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-white hover:text-primary transition"
          >
            SHORT STUDY SESSION
          </button>
          <button
          onClick={() => {
            setPopupTitle('Long Study Session');
            setIsPopupOpen(true);
          }}
          className="bg-dark text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-white hover:text-primary transition"
        >
          LONG STUDY SESSION
          </button>
          <button
          onClick={() => {
            setPopupTitle('Customize');
            setIsPopupOpen(true);
          }}
          className="bg-dark text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-white hover:text-primary transition"
        >
          CUSTOM
        </button>
        <PopUpModal
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          title={popupTitle}
          onStart={(options) => {
            console.log("Starting with:", options);
            // Implement your timer/session logic here!
          }}
        />

        </div>
      </div>
    </div>
    
  );
};

export default LandingPage;
