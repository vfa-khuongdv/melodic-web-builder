import { useParams } from "react-router-dom";
import { Play, Pause } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";

export const TrackDetail = () => {
  const { id } = useParams();
  const { 
    currentTrack, 
    isPlaying, 
    play, 
    pause, 
    resume 
  } = useAudio();

  const handlePlayPause = () => {
    if (!currentTrack) return;
    if (isPlaying) {
      pause();
    } else {
      resume();
    }
  };

  // Mock data - in a real app, this would come from an API
  const trackData = {
    id: "1",
    title: "Die With A Smile",
    artist: "NIKI",
    imageUrl: "https://picsum.photos/800",
    description: "From the album 'Nicole'",
    releaseDate: "2022",
    duration: "3:45",
    genre: "Pop",
    videoUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav", // Replace with actual video URL
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-spotify-light to-spotify-dark p-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
          <div className="relative group w-full md:w-[400px] aspect-square">
            <img
              src={trackData.imageUrl}
              alt={trackData.title}
              className="w-full h-full object-cover rounded-lg shadow-2xl"
            />
            <button
              onClick={handlePlayPause}
              className="absolute bottom-4 right-4 bg-spotify-accent hover:scale-105 transition-all duration-200 rounded-full p-4 shadow-lg"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-black" />
              ) : (
                <Play className="w-6 h-6 text-black" />
              )}
            </button>
          </div>

          <div className="flex-1">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{trackData.title}</h1>
            <p className="text-xl text-spotify-text mb-2">{trackData.artist}</p>
            <p className="text-spotify-text mb-4">{trackData.description}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm text-spotify-text">
              <div>
                <p className="mb-1">Release Date</p>
                <p className="text-white">{trackData.releaseDate}</p>
              </div>
              <div>
                <p className="mb-1">Duration</p>
                <p className="text-white">{trackData.duration}</p>
              </div>
              <div>
                <p className="mb-1">Genre</p>
                <p className="text-white">{trackData.genre}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="mt-8 bg-spotify-light rounded-lg p-4">
          <h2 className="text-2xl font-bold mb-4">Music Video</h2>
          <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
            <video
              className="w-full h-full object-contain"
              controls
              playsInline
              poster={trackData.imageUrl}
              src={trackData.videoUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
};