import { Play, Pause } from "lucide-react";
import { Track, useAudio } from "@/contexts/AudioContext";
import * as HoverCard from "@radix-ui/react-hover-card";


type RankingListProps = {
  tracks: Track[];
};

export const Ranking = ({ tracks }: RankingListProps) => {
  const { currentTrack, play, pause, isPlaying } = useAudio();

  const handlePlayPause = (track: Track) => {
    if (currentTrack?.id === track.id && isPlaying) {
      pause();
    } else {
      play(track);
    }
  };

  return (
    <div className="width-full mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-white">Top 5 Tracks</h2>
      <div className="flex flex-col gap-4">
        {tracks.map((track, index) => (
          <HoverCard.Root key={track.id}>
            <HoverCard.Trigger asChild>
              <div
                className="flex items-center gap-4 p-3 rounded-lg bg-neutral-800/50 hover:bg-neutral-700 transition cursor-pointer"
                onClick={() => handlePlayPause(track)}
              >
                <span className="text-sm font-bold text-white w-8 text-center">
                  {index + 1}
                </span>
                <img
                  src={track.imageUrl}
                  alt={track.title}
                  className="w-12 h-12 rounded-md object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-white">{track.title}</h3>
                  <p className="text-xs text-gray-400">{track.artist}</p>
                </div>
                <button
                  className="text-white p-2 rounded-full bg-green-500 hover:bg-green-400 transition"
                  aria-label={isPlaying && currentTrack?.id === track.id ? "Pause" : "Play"}
                >
                  {isPlaying && currentTrack?.id === track.id ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </button>
              </div>
            </HoverCard.Trigger>

            <HoverCard.Content
              side="top"
              align="center"
              className="rounded-lg bg-neutral-900 p-4 shadow-lg text-white"
            >
              <h4 className="font-medium">{track.title}</h4>
              <p className="text-sm text-gray-400">{track.artist}</p>
            </HoverCard.Content>
          </HoverCard.Root>
        ))}
      </div>
    </div>
  );
};
