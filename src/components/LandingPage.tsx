import React, { useState } from 'react';
import Modal from 'react-modal';
import { useRouter } from 'next/router';

const LandingPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLockIn = (sessionType: string) => {
    router.push(`/lockin?type=${sessionType}`);
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen w-full relative"
      style={{ backgroundColor: '#000' }}
    >
      <div className="relative z-10 w-full flex flex-col items-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">LockedIn</h1>
        <div className="flex space-x-4">
          <button
            className="bg-transparent text-white border border-white hover:bg-gray py-2 px-4 rounded transition"
            onClick={() => handleLockIn('pomodoro')}
          >
            Pomodoro
          </button>
          <button
            className="bg-transparent text-white border border-white hover:bg-gray py-2 px-4 rounded transition"
            onClick={() => handleLockIn('short')}
          >
            Short Study Session
          </button>
          <button
            className="bg-transparent text-white border border-white hover:bg-gray py-2 px-4 rounded transition"
            onClick={() => handleLockIn('long')}
          >
            Long Study Session
          </button>
          <button
            className="bg-transparent text-white border border-white hover:bg-gray py-2 px-4 rounded transition"
            onClick={openModal}
          >
            Customize
          </button>
        </div>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="modal"
          overlayClassName="overlay"
        >
          <h2 className="text-2xl font-bold mb-4">Customize Your Experience</h2>
          <button onClick={closeModal} className="text-red-500">
            Close
          </button>
          {/* add customization options here */}
        </Modal>
      </div>
    </div>
  );
};

export default LandingPage;

