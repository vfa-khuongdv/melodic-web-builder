import { Play } from "lucide-react";

interface PlaylistCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

export const PlaylistCard = ({ title, description, imageUrl }: PlaylistCardProps) => {
  return (
    <div className="playlist-card group">
      <div className="relative aspect-square w-full mb-4">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full rounded-md"
        />
        <button className="play-button">
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