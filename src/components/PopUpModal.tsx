import React, { useState } from 'react';
import { useRouter } from 'next/router';

interface PopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onStart: (options: {
    music: string;
    disablePause: boolean;
    customCycles?: {
      workMin: number;
      workSec: number;
      breakMin: number;
      breakSec: number;
      longBreakMin: number;
      longBreakSec: number;
      cyclesForLongBreak: number;
    };
  }) => void;
}

const sessionDescriptions: Record<string, string> = {
  'OG Pomodoro': "You’ve selected the classic Pomodoro cycle: 25 minutes of focused work followed by 5-minute breaks. After 4 sessions, enjoy a longer 20-minute break.",
  'Short Study Session': "You’ve selected a short and efficient cycle: 15 minutes of focused review with 3-minute breaks. After 4 rounds, take a longer 10-minute rest.",
  'Long Study Session': "You’ve chosen a deep focus session: 50 minutes of intense work and 10-minute breaks. Every 3 sessions, reward yourself with a 25-minute long break.",
  'Customize': "Create your own focus rhythm! Set your own work and break durations and the number of cycles before a long break.",
};

const musicOptions = [
  'None','Lo-Fi',
  'White Noise',
  'Classical Music',
  'Beta Waves for Concentration'
];

const PopUpModal: React.FC<PopUpModalProps> = ({ isOpen, onClose, title, onStart }) => {
  const router = useRouter();
  const [selectedMusic, setSelectedMusic] = useState('None');
  const [disablePause, setDisablePause] = useState(false);

  // Custom values state
  const [workMin, setWorkMin] = useState(25);
  const [workSec, setWorkSec] = useState(0);
  const [breakMin, setBreakMin] = useState(5);
  const [breakSec, setBreakSec] = useState(0);
  const [longBreakMin, setLongBreakMin] = useState(20);
  const [longBreakSec, setLongBreakSec] = useState(0);
  const [cyclesForLongBreak, setCyclesForLongBreak] = useState(4);

  if (!isOpen) return null;

  const handleStart = () => {
    const sessionTypeMap: Record<string, string> = {
      'OG Pomodoro': 'pomodoro',
      'Short Study Session': 'short',
      'Long Study Session': 'long',
      'Customize': 'custom'
    };

    const sessionType = sessionTypeMap[title] || 'pomodoro';

    if (title === 'Customize') {
      // For custom sessions, pass the custom parameters via URL query
      const customParams = {
        workMin,
        workSec,
        breakMin,
        breakSec,
        longBreakMin,
        longBreakSec,
        cyclesForLongBreak,
        music: selectedMusic,
        disablePause: disablePause.toString()
      };
      
      const queryString = new URLSearchParams(customParams as any).toString();
      router.push(`/lockin?type=${sessionType}&${queryString}`);
    } else {
      // For preset sessions, just pass the type and basic options
      const params = {
        type: sessionType,
        music: selectedMusic,
        disablePause: disablePause.toString()
      };
      
      const queryString = new URLSearchParams(params).toString();
      router.push(`/lockin?${queryString}`);
    }
  
    onStart({
      music: selectedMusic,
      disablePause,
      ...(title === 'Customize' && {
        customCycles: {
          workMin,
          workSec,
          breakMin,
          breakSec,
          longBreakMin,
          longBreakSec,
          cyclesForLongBreak,
        }
      })
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-4">
      <div className="bg-dark rounded-xl shadow-xl p-6 w-full max-w-md text-gray-100 relative border border-gray-700 animate-fadeInUp">
        <h2 className="text-xl font-bold mb-2 text-gray-100">{title}</h2>
        <p className="text-sm text-gray-400 mb-4">{sessionDescriptions[title]}</p>

        {/* Show only for Customize */}
        {title === "Customize" && (
          <div className="mb-6 space-y-4">
            {/* Work */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Work Duration</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  min={0}
                  max={99}
                  value={workMin}
                  onChange={e => setWorkMin(Number(e.target.value))}
                  className="w-20 bg-[#232323] border border-gray-600 rounded px-2 py-1 text-gray-100 focus:outline-none focus:border-blue-500"
                  placeholder="min"
                />
                <span className="self-center text-gray-400">min</span>
                <input
                  type="number"
                  min={0}
                  max={59}
                  value={workSec}
                  onChange={e => setWorkSec(Number(e.target.value))}
                  className="w-20 bg-[#232323] border border-gray-600 rounded px-2 py-1 text-gray-100 focus:outline-none focus:border-blue-500"
                  placeholder="sec"
                />
                <span className="self-center text-gray-400">sec</span>
              </div>
            </div>
            {/* Short Break */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Short Break</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  min={0}
                  max={99}
                  value={breakMin}
                  onChange={e => setBreakMin(Number(e.target.value))}
                  className="w-20 bg-[#232323] border border-gray-600 rounded px-2 py-1 text-gray-100 focus:outline-none focus:border-blue-500"
                  placeholder="min"
                />
                <span className="self-center text-gray-400">min</span>
                <input
                  type="number"
                  min={0}
                  max={59}
                  value={breakSec}
                  onChange={e => setBreakSec(Number(e.target.value))}
                  className="w-20 bg-[#232323] border border-gray-600 rounded px-2 py-1 text-gray-100 focus:outline-none focus:border-blue-500"
                  placeholder="sec"
                />
                <span className="self-center text-gray-400">sec</span>
              </div>
            </div>
            {/* Long Break */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Long Break</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  min={0}
                  max={99}
                  value={longBreakMin}
                  onChange={e => setLongBreakMin(Number(e.target.value))}
                  className="w-20 bg-[#232323] border border-gray-600 rounded px-2 py-1 text-gray-100 focus:outline-none focus:border-blue-500"
                  placeholder="min"
                />
                <span className="self-center text-gray-400">min</span>
                <input
                  type="number"
                  min={0}
                  max={59}
                  value={longBreakSec}
                  onChange={e => setLongBreakSec(Number(e.target.value))}
                  className="w-20 bg-[#232323] border border-gray-600 rounded px-2 py-1 text-gray-100 focus:outline-none focus:border-blue-500"
                  placeholder="sec"
                />
                <span className="self-center text-gray-400">sec</span>
              </div>
            </div>
            {/* Cycles to Long Break */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Cycles Before Long Break</label>
              <input
                type="number"
                min={1}
                max={10}
                value={cyclesForLongBreak}
                onChange={e => setCyclesForLongBreak(Number(e.target.value))}
                className="w-24 bg-[#232323] border border-gray-600 rounded px-2 py-1 text-gray-100 focus:outline-none focus:border-blue-500"
                placeholder="cycles"
              />
            </div>
          </div>
        )}

        {/* Select Music */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-200">Select Music</label>
          <select
            value={selectedMusic}
            onChange={e => setSelectedMusic(e.target.value)}
            className="w-full border border-gray-600 rounded bg-[#232323] text-gray-100 px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            {musicOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Disable Pause */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <label htmlFor="disablePause" className="text-sm font-medium text-gray-200">
              Disable Pause
            </label>
            <p className="text-xs text-gray-400 mt-1">
              Removing the pause button helps train your discipline and reduces distractions.
            </p>
          </div>
          <input
            type="checkbox"
            id="disablePause"
            checked={disablePause}
            onChange={() => setDisablePause(!disablePause)}
            className="h-5 w-5 accent-primary bg-gray-700 border-gray-500 rounded focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Lock In Button */}
        <button
          onClick={handleStart}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold transition
            hover:bg-blue-700 focus:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 shadow-md"
        >
          LOCK IN!
        </button>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-white text-2xl
            bg-transparent border-none outline-none focus:outline-none focus-visible:outline-none hover:bg-transparent focus:bg-transparent active:bg-transparent"
          aria-label="Close modal"
          tabIndex={0}
          type="button"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default PopUpModal;
