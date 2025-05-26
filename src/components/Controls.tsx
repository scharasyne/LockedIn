import React from 'react';

interface ControlsProps {
    onStart: () => void;
    onPause: () => void;
    onResume: () => void;
    onReset: () => void;
    isPaused: boolean;
}

const Controls: React.FC<ControlsProps> = ({ onStart, onPause, onResume, onReset, isPaused }) => {
    return (
        <div className="flex justify-center space-x-4 mt-4">
            <button
                onClick={onStart}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
                Start
            </button>
            <button
                onClick={isPaused ? onResume : onPause}
                className={`py-2 px-4 rounded transition ${isPaused ? 'bg-green-500' : 'bg-yellow-500'} text-white`}
            >
                {isPaused ? 'Resume' : 'Pause'}
            </button>
            <button
                onClick={onReset}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
            >
                Reset
            </button>
        </div>
    );
};

export default Controls;