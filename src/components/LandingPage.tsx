import React from 'react';
import { useRouter } from 'next/router';
import PopUpModal from '../components/PopUpModal';
import { useState } from 'react';



const LandingPage: React.FC = () => {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');


  const handleNavigate = (route: string) => {
    router.push(route);
  };

  return ( 
    
    <div
      className="flex flex-col items-center justify-center min-h-screen w-full px-4 text-white font-poppins bg-primary"
        
    >
      {/* <div className="absolute top-4 right-6 flex space-x-6 text-white font-medium text-sm sm:text-base">
        <a
          href="/"
          className="bg-transparent border-none p-0 m-0 hover:underline text-white no-underline outline-none focus:outline-none focus-visible:outline-none"
        >
          Home
        </a>

        <a
          href="/about"
          className="bg-transparent border-none p-0 m-0 hover:underline text-white no-underline outline-none focus:outline-none focus-visible:outline-none"
        >
          About
        </a>

      </div> */}

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
      {/* <PopUpModal
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title={popupTitle}
      >
        <p>This is a customizable popup. You clicked: {popupTitle}</p>
      </PopUpModal> */}
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
    
  );
};

export default LandingPage;
