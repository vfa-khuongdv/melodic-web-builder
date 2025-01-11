import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";

export const PlayerBar = () => {
  const { currentTrack, isPlaying, play, pause, resume, progress } = useAudio();

  const handlePlayPause = () => {
    if (!currentTrack) return;
    if (isPlaying) {
      pause();
    } else {
      resume();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-b from-background/10 to-background/90 backdrop-blur-lg border-t border-white/5 px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-x-4">
          {currentTrack ? (
            <>
              <img src={currentTrack.imageUrl} alt={currentTrack.title} className="w-14 h-14 rounded" />
              <div>
                <h4 className="text-sm font-medium">{currentTrack.title}</h4>
                <p className="text-xs text-spotify-text">{currentTrack.artist}</p>
              </div>
            </>
          ) : (
            <>
              <div className="w-14 h-14 rounded bg-neutral-800" />
              <div>
                <h4 className="text-sm font-medium">Select a song</h4>
                <p className="text-xs text-spotify-text">Artist</p>
              </div>
            </>
          )}
        </div>
        
        <div className="flex flex-col items-center gap-y-2">
          <div className="flex items-center gap-x-6">
            <button className="text-spotify-text hover:text-white transition">
              <SkipBack className="h-5 w-5" />
            </button>
            <button 
              className="rounded-full bg-white p-2 text-black hover:scale-105 transition"
              onClick={handlePlayPause}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </button>
            <button className="text-spotify-text hover:text-white transition">
              <SkipForward className="h-5 w-5" />
            </button>
          </div>
          <div className="w-80 h-1 bg-spotify-light rounded-full">
            <div 
              className="h-full bg-white rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-x-3">
          <Volume2 className="h-5 w-5" />
          <div className="w-24 h-1 bg-spotify-light rounded-full">
            <div className="w-1/2 h-full bg-white rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};