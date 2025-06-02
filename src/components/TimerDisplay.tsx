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
  const getSessionColor = () => {
    switch (sessionType) {
      case 'Study':
        return 'text-white';
      case 'ShortBreak':
        return 'text-white';
      case 'LongBreak':
        return 'text-gray-400';
      default:
        return 'text-white';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className={`text-4xl font-bold mb-4 ${getSessionColor()}`}>
        {sessionType === 'ShortBreak' ? 'Short Break' :
         sessionType === 'LongBreak' ? 'Long Break' : 'Study Time'}
      </h1>
      <div className="text-9xl font-bold font-poppins text-white">
        {formatTime(time)}
      </div>
    </div>
  );
};

export default TimerDisplay;