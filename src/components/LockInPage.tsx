import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import TimerDisplay from './TimerDisplay';
import { Timer } from '@/engine/timer';
import FSM from '@/engine/fsm';
import SpiralBackground from './SpiralBackground';

interface Session {
  studyDuration: number;
  breakDuration: number;
}

const session: Record<string, Session> = {
  pomodoro: { studyDuration: 25 * 60 * 1000, breakDuration: 5 * 60 * 1000 },
  short: { studyDuration: 0.5 * 60 * 1000, breakDuration: 0.2 * 60 * 1000 },
  long: { studyDuration: 45 * 60 * 1000, breakDuration: 15 * 60 * 1000 },
};

const LockInPage: React.FC = () => {
  const router = useRouter();
  const { type } = router.query;

  const [fsm] = useState(() => new FSM());
  const [timer, setTimer] = useState<Timer | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const sessionType = (type as string) || 'pomodoro';
  const config = session[sessionType] || session.pomodoro;

  const getCurrentDuration = () => {
    const state = fsm.getState();
    if (state === 'Study') {
      return config.studyDuration;
    } else if (state === 'ShortBreak' || state === 'LongBreak') {
      return config.breakDuration;
    }
    return config.studyDuration;
  };

  const initializeTimer = (autoStart = false) => {
    const duration = getCurrentDuration();
    setTimeRemaining(duration);
    
    const newTimer = new Timer(
      duration,
      (remaining) => setTimeRemaining(remaining),
      () => {
        fsm.timerEnd();
        setIsRunning(false);
        setIsPaused(false);
        setTimeout(() => {
          initializeTimer(true);
        }, 1000);
      }
    );
    
    setTimer(newTimer);
    
    if (autoStart || hasStarted) {
      setTimeout(() => {
        newTimer.start();
        setIsRunning(true);
        setIsPaused(false);
      }, 100);
    }
  };

  useEffect(() => {
    fsm.start();
    initializeTimer();
  }, []);

  const handleStart = () => {
    if (timer && !isRunning) {
      timer.start();
      setIsRunning(true);
      setIsPaused(false);
      setHasStarted(true);
    }
  };

  const handlePause = () => {
    if (timer && isRunning) {
      timer.pause();
      setIsPaused(true);
    }
  };

  const handleResume = () => {
    if (timer && isPaused) {
      timer.resume();
      setIsPaused(false);
    }
  };

  const handleStop = () => {
    if (timer) {
      timer.reset();
      setIsRunning(false);
      setIsPaused(false);
      setHasStarted(false);
      fsm.reset();
      router.push('/');
    }
  };

  const getSessionType = (): 'Study' | 'ShortBreak' | 'LongBreak' => {
    const state = fsm.getState();
    if (state === 'ShortBreak') return 'ShortBreak';
    if (state === 'LongBreak') return 'LongBreak';
    return 'Study';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full relative overflow-hidden" style={{ backgroundColor: '#000' }}>
      <SpiralBackground />
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Place your timer and controls here */}
        <h1 className="text-4xl font-bold text-white mb-8">Locked In</h1>

        {/* Timer below here */}
        <div className="mb-8">
          <TimerDisplay 
            time={Math.max(0, Math.floor(timeRemaining / 1000))} 
            sessionType={getSessionType()} 
          />
        </div>

        <div className="flex space-x-4">
          {!isRunning && !isPaused && (
            <button 
              onClick={handleStart}
              className="bg-black border border-white text-white py-2 px-6 rounded-full font-bold hover:border-green-600 hover:bg-gray-800 transition"
            >
              Start
            </button>
          )}
          {isRunning && !isPaused && (
            <button 
              onClick={handlePause}
              className="bg-black border border-white text-white py-2 px-6 rounded-full font-bold hover:bg-gray-800 transition"
            >
              Pause
            </button>
          )}
          {isPaused && (
            <button 
              onClick={handleResume}
              className="bg-black border border-white text-white py-2 px-6 rounded-full font-bold hover:border-blue-600 hover:bg-gray-800 transition"
            >
              Resume
            </button>
          )}
          <button 
            onClick={handleStop}
            className="bg-white text-black py-2 px-6 rounded-full font-bold hover:bg-gray-300 transition"
          >
            Stop
          </button>
        </div>
        
        <div className="mt-4 text-white text-center">
          <p>Sessions completed: {fsm.getCompletedSessions()}</p>
          <p className="text-sm opacity-75 mt-2">
            {sessionType.charAt(0).toUpperCase() + sessionType.slice(1)} Mode
          </p>
        </div>
      </div>
    </div>
  );
};

export default LockInPage;
