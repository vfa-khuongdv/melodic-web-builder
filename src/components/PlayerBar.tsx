import { Play, SkipBack, SkipForward, Volume2 } from "lucide-react";

export const PlayerBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-b from-background/10 to-background/90 backdrop-blur-lg border-t border-white/5 px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-x-4">
          <div className="w-14 h-14 rounded bg-neutral-800 animate-pulse" />
          <div>
            <h4 className="text-sm font-medium">Select a song</h4>
            <p className="text-xs text-spotify-text">Artist</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-y-2">
          <div className="flex items-center gap-x-6">
            <button className="text-spotify-text hover:text-white transition">
              <SkipBack className="h-5 w-5" />
            </button>
            <button className="rounded-full bg-white p-2 text-black hover:scale-105 transition">
              <Play className="h-5 w-5" />
            </button>
            <button className="text-spotify-text hover:text-white transition">
              <SkipForward className="h-5 w-5" />
            </button>
          </div>
          <div className="w-80 h-1 bg-spotify-light rounded-full">
            <div className="w-0 h-full bg-white rounded-full" />
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