import React from 'react';

interface TimerDisplayProps {
  time: number; // Time in seconds
  sessionType: 'Study' | 'ShortBreak' | 'LongBreak';
  totalTime: number; // Total session duration in seconds
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const TimerDisplay: React.FC<TimerDisplayProps> = ({ time, sessionType, totalTime }) => {
  const getSessionColor = () => {
    switch (sessionType) {
      case 'Study':
        return 'text-blue-400';
      case 'ShortBreak':
        return 'text-green-400';
      case 'LongBreak':
        return 'text-purple-400';
      default:
        return 'text-white';
    }
  };

  const getRingColor = () => {
    switch (sessionType) {
      case 'Study':
        return '#3b82f6'; // blue-500
      case 'ShortBreak':
        return '#10b981'; // green-500
      case 'LongBreak':
        return '#8b5cf6'; // purple-500
      default:
        return '#3b82f6';
    }
  };

  // Calculate timer progress
  // const timeElapsed = totalTime - time;
  const progress = totalTime > 0 ? (time / totalTime) * 100 : 0;
  const radius = 200;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className='relative flex items-center justify-center'>
        <svg className="transform -rotate-90" width="440" height="440">
          {/* Background circle */}
          <circle
            cx="220"
            cy="220"
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx="220"
            cy="220"
            r={radius}
            stroke={getRingColor()}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300 ease-in-out"
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center">
          <h1 className={`text-6xl font-bold mb-2 ${getSessionColor()} text-center`}>
            {sessionType === 'ShortBreak' ? 'Short Break' :
             sessionType === 'LongBreak' ? 'Long Break' : 'Study Time'}
          </h1>
          <div className="text-7xl font-bold font-poppins text-white">
            {formatTime(time)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerDisplay;