import React, { createContext, useContext, useState, useRef } from "react";

interface MediaContextType {
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
  mediaUrl: string;
  type: 'audio' | 'video';
}

const AudioContext = createContext<MediaContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement | null>(null);

  // Updated playlist with video content
  const playlist = [
    {
      id: "1",
      title: "Die With A Smile",
      artist: "NIKI",
      imageUrl: "https://picsum.photos/200",
      mediaUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav",
      type: 'audio' as const
    },
    {
      id: "2",
      title: "Sample Video",
      artist: "Sample Artist",
      imageUrl: "https://picsum.photos/201",
      mediaUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
      type: 'video' as const
    },
    {
      id: "3",
      title: "High School in Jakarta",
      artist: "NIKI",
      imageUrl: "https://picsum.photos/202",
      mediaUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav",
      type: 'audio' as const
    }
  ];

  const getCurrentTrackIndex = () => {
    if (!currentTrack) return -1;
    return playlist.findIndex((track) => track.id === currentTrack.id);
  };

  const play = (track: Track) => {
    if (mediaRef.current) {
      if (currentTrack?.id === track.id) {
        mediaRef.current.play();
        setIsPlaying(true);
        return;
      }
      mediaRef.current.src = track.mediaUrl;
      mediaRef.current.play();
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (mediaRef.current) {
      mediaRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resume = () => {
    if (mediaRef.current) {
      mediaRef.current.play();
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
    if (mediaRef.current) {
      mediaRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  React.useEffect(() => {
    // Create appropriate media element based on current track type
    const cleanupMedia = () => {
      if (mediaRef.current) {
        mediaRef.current.pause();
        mediaRef.current.remove();
      }
    };

    cleanupMedia();
    
    if (currentTrack) {
      mediaRef.current = currentTrack.type === 'video' 
        ? document.createElement('video')
        : document.createElement('audio');
      
      mediaRef.current.volume = volume;
      
      mediaRef.current.addEventListener("timeupdate", () => {
        if (mediaRef.current) {
          setProgress((mediaRef.current.currentTime / mediaRef.current.duration) * 100);
        }
      });
    }

    return cleanupMedia;
  }, [currentTrack?.type]);

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