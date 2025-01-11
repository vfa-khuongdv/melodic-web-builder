import { Play } from "lucide-react";
import { useAudio, Track } from "@/contexts/AudioContext";

interface PlaylistCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

export const PlaylistCard = ({ title, description, imageUrl }: PlaylistCardProps) => {
  const { play } = useAudio();

  const handlePlay = () => {
    const track: Track = {
      id: title, // Using title as ID for demo
      title,
      artist: description,
      imageUrl,
      // Using a sample audio file for demonstration
      audioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav",
    };
    play(track);
  };

  return (
    <div className="playlist-card group relative">
      <div className="relative aspect-square w-full mb-4">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full rounded-md"
        />
        <button 
          className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handlePlay}
        >
          <div className="rounded-full bg-spotify-accent p-3 hover:scale-105 transition">
            <Play className="h-5 w-5 text-black" fill="black" />
          </div>
        </button>
      </div>
      <h3 className="font-semibold truncate">{title}</h3>
      <p className="text-sm text-spotify-text line-clamp-2">{description}</p>
    </div>
  );
};