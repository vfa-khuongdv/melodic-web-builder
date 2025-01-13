import React, { createContext, useContext, useState, useRef, useEffect } from "react";

interface AudioContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  play: (track: Track) => void;
  pause: () => void;
  resume: () => void;
  progress: number;
  volume: number;
  setVolume: (volume: number) => void;
  nextTrack: () => void;
  previousTrack: () => void;
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
  progress: number;
}

const PLAYER_STATE_KEY = 'spotify_player_state';

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Updated playlist with more songs
  const playlist = [
    {
      id: "1",
      title: "Die With A Smile",
      artist: "NIKI",
      imageUrl: "https://picsum.photos/200",
      audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav", // Using placeholder audio
    },
    {
      id: "2",
      title: "Apt.",
      artist: "NIKI",
      imageUrl: "https://picsum.photos/201",
      audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/ImperialMarch60.wav", // Using placeholder audio
    },
    {
      id: "3",
      title: "High School in Jakarta",
      artist: "NIKI",
      imageUrl: "https://picsum.photos/202",
      audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav", // Using placeholder audio
    },
    {
      id: "4",
      title: "Before",
      artist: "NIKI",
      imageUrl: "https://picsum.photos/203",
      audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/ImperialMarch60.wav", // Using placeholder audio
    },
    {
      id: "5",
      title: "Oceans & Engines",
      artist: "NIKI",
      imageUrl: "https://picsum.photos/204",
      audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav", // Using placeholder audio
    }
  ];

  // Load saved state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem(PLAYER_STATE_KEY);
    if (savedState) {
      const { currentTrack, volume, progress } = JSON.parse(savedState) as PlayerState;
      if (currentTrack) {
        setCurrentTrack(currentTrack);
        if (audioRef.current) {
          audioRef.current.src = currentTrack.audioUrl;
          audioRef.current.currentTime = (progress / 100) * audioRef.current.duration || 0;
        }
      }
      setVolume(volume);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    const state: PlayerState = {
      currentTrack,
      volume,
      progress,
    };
    localStorage.setItem(PLAYER_STATE_KEY, JSON.stringify(state));
  }, [currentTrack, volume, progress]);

  const getCurrentTrackIndex = () => {
    if (!currentTrack) return -1;
    return playlist.findIndex((track) => track.id === currentTrack.id);
  };

  const play = (track: Track) => {
    if (audioRef.current) {
      if (currentTrack?.id === track.id) {
        audioRef.current.play();
        setIsPlaying(true);
        return;
      }
      audioRef.current.src = track.audioUrl;
      audioRef.current.play();
      setCurrentTrack(track);
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
    if (currentIndex < playlist.length - 1) {
      play(playlist[currentIndex + 1]);
    }
  };

  const previousTrack = () => {
    const currentIndex = getCurrentTrackIndex();
    if (currentIndex > 0) {
      play(playlist[currentIndex - 1]);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  React.useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;
    
    audioRef.current.addEventListener("timeupdate", () => {
      if (audioRef.current) {
        setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
      }
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
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
        progress, 
        volume, 
        setVolume: handleVolumeChange,
        nextTrack,
        previousTrack
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