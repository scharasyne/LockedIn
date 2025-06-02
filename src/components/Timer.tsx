import React, { useState, useEffect, useRef } from 'react';

interface TimerProps {
  initialSeconds: number;
}

const Timer: React.FC<TimerProps> = ({ initialSeconds }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true); // Start immediately
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive && seconds > 0) {
      intervalRef.current = window.setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, seconds]);

  useEffect(() => {
    if (seconds <= 0) {
      setIsActive(false);
      setSeconds(0);
    }
  }, [seconds]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };
  const handlePause = () => {
    setIsActive(false);
    setIsPaused(true);
  };
  const handleResume = () => {
    setIsActive(true);
    setIsPaused(false);
  };
  const handleStop = () => {
    setIsActive(false);
    setIsPaused(false);
    setSeconds(1500);
  };

  // format: hour mins secs
  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600)
      .toString()
      .padStart(2, '0');
    const m = Math.floor((secs % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div>
      <div className="text-5xl font-mono text-white mb-4">{formatTime(seconds)}</div>
      <div className="flex space-x-4">
        {(!isActive && isPaused) ? (
          <button
            className="bg-white text-black py-2 px-6 rounded-full font-bold"
            onClick={handleResume}
            disabled={seconds === 0}
          >
            Resume
          </button>
        ) : (
          <button
            className="bg-white text-black py-2 px-6 rounded-full font-bold"
            onClick={handleStart}
            disabled={isActive || seconds === 0}
          >
            Start
          </button>
        )}
        {isActive ? (
          <button
            className="bg-black border border-white text-white py-2 px-6 rounded-full font-bold"
            onClick={handlePause}
            disabled={!isActive || seconds === 0}
          >
            Pause
          </button>
        ) : isPaused ? (
          <button
            className="bg-black border border-white text-white py-2 px-6 rounded-full font-bold"
            onClick={handleStop}
            disabled={seconds === 0}
          >
            Stop
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Timer;