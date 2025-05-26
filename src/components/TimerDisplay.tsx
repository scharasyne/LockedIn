import React from 'react';

interface TimerDisplayProps {
  time: number; // Time in seconds
  sessionType: 'Study' | 'ShortBreak' | 'LongBreak';
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const TimerDisplay: React.FC<TimerDisplayProps> = ({ time, sessionType }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold text-3A86FF mb-4">{sessionType}</h1>
      <div className="text-6xl font-mono text-2B2B2B">
        {formatTime(time)}
      </div>
    </div>
  );
};

export default TimerDisplay;