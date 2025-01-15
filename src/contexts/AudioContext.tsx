import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { playlists } from "../shared/constants";

/**
 * Interface defining the shape of the audio context
 * Contains methods and properties for controlling audio playback
 */
interface AudioContextType {
  currentTrack: Track | null;        // Currently playing track
  isPlaying: boolean;                // Whether audio is currently playing
  play: (track: Track) => void;      // Start playing a track
  pause: () => void;                 // Pause current playback
  resume: () => void;                // Resume paused playback
  seek: (position: number) => void;  // Seek to position in track
  progress: number;                  // Current playback progress (0-100)
  volume: number;                    // Current volume level (0-1)
  setVolume: React.Dispatch<React.SetStateAction<number>>; // Set the volume level
  nextTrack: () => void;            // Skip to next track
  previousTrack: () => void;         // Go to previous track
  setProgress: (...args) => void,    // Update progress value
  audioRef                           // Reference to audio element
  initPlay: boolean;                 // Flag indicating whether playback has been initialized after page load
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  audioUrl: string;
}

interface PlayerState {
  currentTrack: Track | null;
  volume: number;
  currentTime: number;
}


const PLAYER_STATE_KEY = 'PLAYER_STATE_KEY'

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [initPlay, setInitPlay] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const getCurrentTrackIndex = () => {
    // Check if currentTrack is set in the state
    if (!currentTrack) {
      // If not, try to get the current track from localStorage
      const storedTrack = localStorage.getItem("currentTrack");
      if (storedTrack) {
        const trackFromStorage: Track = JSON.parse(storedTrack);
        return playlists.findIndex((track) => track.id === trackFromStorage.id);
      }
      return -1; // Return -1 if no track is found in either state or localStorage
    }
    // If currentTrack is set in the state, use that
    return playlists.findIndex((track) => track.id === currentTrack.id);
  };


  // Play a track and update localStorage
  const play = (track: Track) => {
    console.log('track', track)
    setInitPlay(true);
    setCurrentTrack(track);
    localStorage.setItem("currentTrack", JSON.stringify(track)); // Store current track in localStorage
    if (audioRef.current) {
      if (currentTrack?.id === track.id) {
        audioRef.current.play();
        setIsPlaying(true);
        return;
      }

      audioRef.current.src = track.audioUrl;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resume = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const nextTrack = () => {
    const currentIndex = getCurrentTrackIndex();
    if (currentIndex < playlists.length - 1) {
      play(playlists[currentIndex + 1]);
    } else {
      play(playlists[0]);
    }
  };

  const previousTrack = () => {
    const currentIndex = getCurrentTrackIndex();
    if (currentIndex > 0) {
      play(playlists[currentIndex - 1]);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const seek = (position: number) => {
    if (audioRef.current) {
      const newTime = (position / 100) * (audioRef.current.duration || 0);
      audioRef.current.currentTime = newTime;
      setProgress((newTime / audioRef.current.duration) * 100);
    }
  };

  const onSavePlayerState = (state: PlayerState) => {
    localStorage.setItem(PLAYER_STATE_KEY, JSON.stringify(state))
  }

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;

    const savedState = localStorage.getItem(PLAYER_STATE_KEY);
    if (savedState) {
      const { currentTrack, currentTime } = JSON.parse(savedState) as PlayerState;
      if (currentTrack) {
        setCurrentTrack(currentTrack);
        if (audioRef.current) {
          audioRef.current.src = currentTrack.audioUrl;
          audioRef.current.currentTime = currentTime || 0
        }
      }
    }


    audioRef.current.addEventListener("timeupdate", () => {
      if (audioRef.current && audioRef.current.duration) {
        const percent = (audioRef.current.currentTime / audioRef.current.duration) * 100
        setProgress(percent);
        // Save state of player

        const storedTrack = localStorage.getItem("currentTrack");
        if (!storedTrack) {
          return;
        }

        onSavePlayerState({
          currentTrack: JSON.parse(storedTrack),
          volume,
          currentTime: audioRef.current.currentTime,
        })
      }
    });

    audioRef.current.addEventListener("ended", () => {
      nextTrack();
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("timeupdate", () => { });
        audioRef.current.removeEventListener("ended", () => { });
        audioRef.current.remove();
      }
    };
  }, []);

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        play,
        pause,
        resume,
        seek,
        progress,
        volume,
        setVolume: handleVolumeChange,
        nextTrack,
        previousTrack,
        audioRef,
        initPlay,
        setProgress,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error("useAudio must be used within an AudioProvider");
  return context;
};
