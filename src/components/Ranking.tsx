import { Play, Pause, Heart } from "lucide-react";
import { Track, useAudio } from "@/contexts/AudioContext";
import { useState } from "react";

type RankingListProps = {
  tracks: Track[];
};

export const Ranking = ({ tracks }: RankingListProps) => {
  const { currentTrack, play, pause, isPlaying } = useAudio();

  // State to track liked songs
  const [likedTracks, setLikedTracks] = useState<Set<string>>(new Set());

  const handlePlayPause = (track: Track) => {
    if (currentTrack?.id === track.id && isPlaying) {
      pause();
    } else {
      play(track);
    }
  };

  const handleAddToLikedSongs = (track: Track) => {
    const newLikedTracks = new Set(likedTracks);
    if (newLikedTracks.has(track.id)) {
      newLikedTracks.delete(track.id); // Remove from liked
    } else {
      newLikedTracks.add(track.id); // Add to liked
    }
    setLikedTracks(newLikedTracks); // Update state
    console.log(`Toggled ${track.title} liked state.`);
  };

  return (
    <div className="w-full mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-white">Top 5 Tracks</h2>
      <div className="flex flex-col gap-4">
        {tracks.map((track, index) => (
          <div
            key={track.id}
            className={`flex items-center gap-4 p-3 rounded-lg transition cursor-pointer ${currentTrack?.id === track.id && isPlaying
              ? "bg-neutral-700 hover:bg-neutral-700"
              : "bg-neutral-800/50 hover:bg-neutral-700"
              }`}
          >
            {/* Rank */}
            <span className="text-sm font-bold text-white w-8 text-center">
              {index + 1}
            </span>
            {/* Track Image */}
            <img
              src={track.imageUrl}
              alt={track.title}
              className="w-12 h-12 rounded-md object-cover"
            />
            {/* Track Info */}
            <div className="flex-1">
              <h3 className="text-sm font-medium text-white">{track.title}</h3>
              <p className="text-xs text-gray-400">{track.artist}</p>
            </div>
            {/* Like Button */}
            <button
              className={`p-2 rounded-full transition duration-300 ${likedTracks.has(track.id)
                ? "text-red-500 bg-red-500/10 hover:bg-red-500/20"
                : "text-gray-400 hover:bg-gray-500/10"
                }`}
              aria-label="Toggle Like"
              onClick={() => handleAddToLikedSongs(track)}
            >
              <Heart className="w-5 h-5" />
            </button>
            {/* Play/Pause Button */}
            <button
              className={`text-white p-2 rounded-full ${isPlaying && currentTrack?.id === track.id
                ? "bg-green-500 hover:bg-green-400"
                : "bg-green-500 hover:bg-green-400"
                } transition duration-300`}
              aria-label={isPlaying && currentTrack?.id === track.id ? "Pause" : "Play"}
              onClick={() => handlePlayPause(track)}
            >
              {isPlaying && currentTrack?.id === track.id ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
