import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import TimerDisplay from './TimerDisplay';
import { Timer } from '@/engine/timer';
import FSM from '@/engine/fsm';
import SpiralBackground from './SpiralBackground';

interface Session {
  studyDuration: number;
  breakDuration: number;
  longBreakDuration?: number;
  cyclesForLongBreak?: number;
}

const presetSessions: Record<string, Session> = {
  pomodoro: { 
    studyDuration: 25 * 60 * 1000, 
    breakDuration: 5 * 60 * 1000,
    longBreakDuration: 20 * 60 * 1000,
    cyclesForLongBreak: 4
  },
  short: { 
    studyDuration: 15 * 60 * 1000, 
    breakDuration: 3 * 60 * 1000,
    longBreakDuration: 10 * 60 * 1000,
    cyclesForLongBreak: 4
  },
  long: { 
    studyDuration: 50 * 60 * 1000, 
    breakDuration: 10 * 60 * 1000,
    longBreakDuration: 25 * 60 * 1000,
    cyclesForLongBreak: 3
  },
};

const LockInPage: React.FC = () => {
  const router = useRouter();
  const { type,
          music,
          disablePause,
          workMin,
          workSec,
          breakMin,
          breakSec,
          longBreakMin,
          longBreakSec,
          cyclesForLongBreak
   } = router.query;

  const [fsm] = useState(() => new FSM());
  const [timer, setTimer] = useState<Timer | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const sessionType = (type as string) || 'pomodoro';

  const getSessionConfig = (): Session => {
    if (sessionType === 'custom' && workMin && breakMin) {
      return {
        studyDuration: (Number(workMin) * 60 + Number(workSec || 0)) * 1000,
        breakDuration: (Number(breakMin) * 60 + Number(breakSec || 0)) * 1000,
        longBreakDuration: (Number(longBreakMin || 20) * 60 + Number(longBreakSec || 0)) * 1000,
        cyclesForLongBreak: Number(cyclesForLongBreak || 4)
      };
    }
    return presetSessions[sessionType] || presetSessions.pomodoro;
  };

  const config = getSessionConfig();

  const getCurrentDuration = () => {
    const state = fsm.getState();
    if (state === 'Study') {
      return config.studyDuration;
    } else if (state === 'LongBreak') {
      return config.longBreakDuration || config.breakDuration;
    } else if (state === 'ShortBreak') {
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
        <div className="mb-8">
          <TimerDisplay 
            time={Math.max(0, Math.floor(timeRemaining / 1000))} 
            sessionType={getSessionType()} 
            totalTime={Math.floor(getCurrentDuration() / 1000)}
          />
        </div>

        {music && music !== 'None' && (
          <div className='mb-6 text-center'>
            <p className='text-white text-lg font-medium font-mono'>
              🎵 {music}
            </p>
          </div>
        )}

        <div className="flex space-x-4">
          {!isRunning && !isPaused && (
            <button 
              onClick={handleStart}
              className="bg-black border border-white text-white py-2 px-6 rounded-full font-bold hover:bg-gray-800 transition"
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
              className="bg-black border border-white text-white py-2 px-6 rounded-full font-bold hover:bg-gray-800 transition"
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