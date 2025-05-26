import React, { useState } from 'react';

const MusicBar: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [selectedTrack, setSelectedTrack] = useState<string | null>(null);

    const tracks = [
        { id: 1, name: 'Lo-fi Beats' },
        { id: 2, name: 'Classical Music' },
        { id: 3, name: 'Nature Sounds' },
    ];

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
        // Logic to play or pause the selected track
    };

    const handleTrackChange = (track: string) => {
        setSelectedTrack(track);
        // Logic to change the music track
    };

    return (
        <div className="bg-gray-200 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800">Music Bar</h2>
            <div className="flex items-center space-x-4 mt-2">
                <select
                    value={selectedTrack || ''}
                    onChange={(e) => handleTrackChange(e.target.value)}
                    className="border border-gray-400 rounded p-2"
                >
                    <option value="" disabled>Select a track</option>
                    {tracks.map(track => (
                        <option key={track.id} value={track.name}>{track.name}</option>
                    ))}
                </select>
                <button
                    onClick={handlePlayPause}
                    className={`px-4 py-2 rounded ${isPlaying ? 'bg-red-500' : 'bg-green-500'} text-white`}
                >
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
            </div>
        </div>
    );
};

export default MusicBar;