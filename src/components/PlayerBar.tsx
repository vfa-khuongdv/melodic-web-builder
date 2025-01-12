import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";
import { Slider } from "@/components/ui/slider";
import { useEffect } from "react";

export const PlayerBar = () => {
  const {
    currentTrack,
    isPlaying,
    pause,
    resume,
    seek,
    progress,
    volume,
    setVolume,
    nextTrack,
    previousTrack,
    setProgress,
    audioRef // Get audioRef from useAudio
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

  const handleSeekChange = (value: number[]) => {
    seek(value[0]);
  };

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Ensure that the audioRef's duration is set correctly
  useEffect(() => {
    if (audioRef?.current) {
      // Update progress every time the audio plays
      const updateProgress = () => {
        if (audioRef.current?.duration) {
          setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        }
      };

      audioRef?.current.addEventListener("timeupdate", updateProgress);

      return () => {
        audioRef?.current?.removeEventListener("timeupdate", updateProgress);
      };
    }
  }, [audioRef]);

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
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
            <button
              className="text-spotify-text hover:text-white transition"
              onClick={nextTrack}
            >
              <SkipForward className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center gap-x-2">
            {/* Current time display */}
            <span className="text-xs text-spotify-text">{formatTime((progress / 100) * (audioRef?.current?.duration || 0))}</span>
            <div className="w-80">
              <Slider
                value={[progress]}
                max={100}
                step={1}
                onValueChange={handleSeekChange}
                className="w-full"
              />
            </div>
            {/* Total time display */}
            <span className="text-xs text-spotify-text">{currentTrack && audioRef?.current?.duration ? formatTime(audioRef?.current.duration) : "0:00"}</span>
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
    </div>
  );
};
