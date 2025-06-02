export const musicOptions = [
  { value: 'None', label: 'None', src: null },
  { value: 'Lofi', label: 'Lofi Beats', src: '/music/lofi.mp3' },
  { value: 'Classical', label: 'Classical', src: '/music/classical.mp3' },
  { value: 'Jazz', label: 'Jazz', src: '/music/jazz.mp3' },
  { value: 'White Noise', label: 'White Noise', src: '/music/noise.mp3' },
  { value: 'Nature', label: 'Nature Sounds', src: '/music/nature.mp3' }
];

export const getMusicSrc = (musicType: string): string | null => {
  const option = musicOptions.find(opt => opt.value === musicType);
  return option?.src || null;
};