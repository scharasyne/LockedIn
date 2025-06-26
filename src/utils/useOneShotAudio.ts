import { useRef } from 'react';

export const useOneShotAudio = (src: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
      audioRef.current.volume = 1.0;
    } else {
      audioRef.current.currentTime = 0;
    }
    audioRef.current.loop = false;
    audioRef.current.play();
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return { play, stop };
}; 