import React from 'react';
import TimerDisplay from '../components/TimerDisplay';
import Controls from '../components/Controls';
import MusicBar from '../components/MusicBar';

const WorkingPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">LockedIn - Focus Timer</h1>
            <TimerDisplay time={0} sessionType="Study" totalTime={0} />
            <Controls
                onStart={() => {}}
                onPause={() => {}}
                onResume={() => {}}
                onReset={() => {}}
                isPaused={false}
            />
            <MusicBar />
        </div>
    );
};

export default WorkingPage;