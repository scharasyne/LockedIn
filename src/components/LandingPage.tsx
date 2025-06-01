import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import { colorPalette } from '../utils/colorPalette';
import SpiralBackground from './SpiralBackground';

const LandingPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full relative overflow-hidden"
            style={{ backgroundColor: '#000' }}
        >
            <SpiralBackground />
            <div className="relative z-10 w-full flex flex-col items-center">
                <div className="bg-red-500 text-white p-10">Tailwind Test</div>
                <h1 className="text-4xl font-bold text-blue-600 mb-8">LockedIn</h1>
                <div className="flex space-x-4">
                    <button 
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                        onClick={() => console.log('Start Pomodoro')}
                    >
                        Pomodoro
                    </button>
                    <button 
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                        onClick={() => console.log('Start Short Study Session')}
                    >
                        Short Study Session
                    </button>
                    <button 
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                        onClick={() => console.log('Start Long Study Session')}
                    >
                        Long Study Session
                    </button>
                    <button 
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
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
                    <button onClick={closeModal} className="text-red-500">Close</button>
                    {/* Add customization options here */}
                </Modal>
            </div>
        </div>
    );
};

export default LandingPage;