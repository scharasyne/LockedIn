import React from 'react';
import SpiralBackground from './SpiralBackground';

const LockInPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full relative overflow-hidden" style={{ backgroundColor: '#000' }}>
      <SpiralBackground />
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Place your timer and controls here */}
        <h1 className="text-4xl font-bold text-white mb-8">Locked In</h1>
        {/* Example timer placeholder */}
        <div className="text-5xl font-mono text-white mb-4">00:25:00</div>
        <div className="flex space-x-4">
          <button className="bg-white text-black py-2 px-6 rounded-full font-bold">Stop</button>
          <button className="bg-black border border-white text-white py-2 px-6 rounded-full font-bold">Pause</button>
        </div>
      </div>
    </div>
  );
};

export default LockInPage;
