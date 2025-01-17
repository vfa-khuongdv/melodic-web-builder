import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState, useRef } from "react";
import VolumeDisplay from "./ui/volume-display";

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
    audioRef,
    initPlay,
    play,
  } = useAudio();

  const [volumeVisible, setVolumeVisible] = useState(false);
  const volumeTimeout = useRef<NodeJS.Timeout | null>(null);

  const showVolumeDisplay = () => {
    setVolumeVisible(true);

    if (volumeTimeout.current) {
      clearTimeout(volumeTimeout.current);
    }

    volumeTimeout.current = setTimeout(() => {
      setVolumeVisible(false);
    }, 2000); // 1-second debounce
  };

  const handlePlayPause = () => {
    if (!currentTrack) return;

    if (!initPlay) {
      play(currentTrack);
      return;
    }

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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  useEffect(() => {
    if (audioRef?.current) {
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        const newVolume = Math.min((audioRef?.current?.volume) + 0.1, 1);
        setVolume(newVolume);
        console.log('ArrowUp', newVolume)
        showVolumeDisplay();
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        const newVolume = Math.max((audioRef?.current?.volume) - 0.1, 0);
        console.log('ArrowDown', newVolume)
        setVolume(newVolume);
        showVolumeDisplay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setVolume]);

  return (
    <>
      <VolumeDisplay volume={Math.round(volume * 100)} visible={volumeVisible} />

      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-b from-background/10 to-background/90 backdrop-blur-lg border-t border-white/5 px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Track Info */}
          <div className="flex items-center gap-x-4 flex-1">
            {currentTrack ? (
              <>
                <img
                  src={currentTrack.imageUrl}
                  alt={currentTrack.title}
                  className="w-14 h-14 rounded"
                />
                <div>
                  <h4 className="text-sm font-medium">{currentTrack.title}</h4>
                  <p className="text-xs text-spotify-text hidden sm:block">{currentTrack.artist}</p>
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

          {/* Player Controls */}
          <div className="flex flex-col items-center gap-y-2 flex-1">
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

            <div className="flex items-center gap-x-2 w-full">
              <span className="text-xs w-[4ch] text-spotify-text">
                {formatTime((progress / 100) * (audioRef?.current?.duration || 0))}
              </span>
              <div className="flex-1">
                <Slider
                  value={[progress]}
                  max={100}
                  step={1}
                  onValueChange={handleSeekChange}
                  className="w-full"
                />
              </div>
              <span className="text-xs w-[4ch] text-spotify-text">
                {currentTrack && audioRef?.current?.duration
                  ? formatTime(audioRef?.current.duration)
                  : "0:00"}
              </span>
            </div>
          </div>

          {/* Volume Control (hidden on mobile) */}
          <div className="items-center gap-x-3 flex-1 justify-end hidden sm:flex">
            <Volume2 className="h-5 w-5" />
            <div className="w-20 sm:w-24">
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
    </>
  );
};
