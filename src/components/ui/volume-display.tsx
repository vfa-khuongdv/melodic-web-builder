import React from "react";
import { Volume2 } from "lucide-react";

interface VolumeDisplayProps {
  volume: number; // Volume as a percentage (0-100)
  visible: boolean; // Controls visibility
}

const VolumeDisplay: React.FC<VolumeDisplayProps> = ({ volume, visible }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
    >
      <div className="flex items-center gap-3 bg-white/20 backdrop-blur-lg px-8 py-4 rounded-lg shadow-lg">
        {/* Explicitly set the size of the icon */}
        <Volume2 className="h-8 w-8 text-white" />
        <span className="text-white text-xl font-semibold w-10">{volume}%</span>
      </div>
    </div>
  );
};

export default VolumeDisplay;
