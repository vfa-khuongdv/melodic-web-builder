import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";
import { Slider } from "@/components/ui/slider";

export const PlayerBar = () => {
  const { 
    currentTrack, 
    isPlaying, 
    play, 
    pause, 
    resume, 
    progress,
    volume,
    setVolume,
    nextTrack,
    previousTrack
  } = useAudio();

  const handlePlayPause = () => {
    if (!currentTrack) return;
    if (isPlaying) {
      pause();
    } else {
      resume();
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0] / 100);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-b from-background/10 to-background/90 backdrop-blur-lg border-t border-white/5 px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-x-4">
          {currentTrack ? (
            <>
              <video 
                src={currentTrack.mediaUrl}
                className="w-14 h-14 rounded object-cover"
              />
              <div>
                <h4 className="text-sm font-medium">{currentTrack.title}</h4>
                <p className="text-xs text-spotify-text">{currentTrack.artist}</p>
              </div>
            </>
          ) : (
            <>
              <div className="w-14 h-14 rounded bg-neutral-800" />
              <div>
                <h4 className="text-sm font-medium">Select a video</h4>
                <p className="text-xs text-spotify-text">Artist</p>
              </div>
            </>
          )}
        </div>
        
        <div className="flex flex-col items-center gap-y-2">
          <div className="flex items-center gap-x-6">
            <button 
              className="text-spotify-text hover:text-white transition"
              onClick={previousTrack}
            >
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
            <button 
              className="text-spotify-text hover:text-white transition"
              onClick={nextTrack}
            >
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
          <div className="w-24">
            <Slider
              value={[volume * 100]}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {currentTrack && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl aspect-video bg-black rounded-lg overflow-hidden">
          <video
            src={currentTrack.mediaUrl}
            className="w-full h-full"
            controls
            autoPlay={isPlaying}
          />
        </div>
      )}
    </div>
  );
};