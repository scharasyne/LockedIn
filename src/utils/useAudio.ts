import { useState, useRef, useEffect } from 'react';

export const useAudio = (src: string | null) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (src) {
      audioRef.current = new Audio(src);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
      
      const audio = audioRef.current;
      
      const handleCanPlay = () => setIsLoaded(true);
      const handleEnded = () => setIsPlaying(false);
      
      audio.addEventListener('canplaythrough', handleCanPlay);
      audio.addEventListener('ended', handleEnded);
      
      return () => {
        audio.removeEventListener('canplaythrough', handleCanPlay);
        audio.removeEventListener('ended', handleEnded);
        audio.pause();
        audio.src = '';
      };
    }
  }, [src]);

  const play = async () => {
    if (audioRef.current && isLoaded) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const setVolume = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume));
    }
  };

  return { play, pause, isPlaying, isLoaded, setVolume };
};