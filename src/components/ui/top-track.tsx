import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAudio } from "@/contexts/AudioContext";
import { playlists } from "@/shared/constants";
import { Play, AudioLines } from "lucide-react";

const top5 = [...playlists.splice(5, 5)]

export function TopTracks() {
  const { play, currentTrack } = useAudio();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Top 5 Tracks</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Artist</TableHead>
            <TableHead className="text-right">Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {top5.map((track, index) => (
            <TableRow
              key={track.id}
              className="group cursor-pointer hover:bg-secondary/50"
              onClick={() => play(track)}
            >
              <TableCell className="font-medium">
                {currentTrack?.id === track.id ? (
                  // Show the animated audio lines icon when the track is playing
                  <AudioLines className="h-5 w-5 text-green-500 animate-pulse" />
                ) : (
                  // Show the index when the track is not playing
                  index + 1
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10">
                    <img
                      src={track.imageUrl}
                      alt={track.title}
                      className="w-full h-full object-cover rounded"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="h-4 w-4" />
                    </div>
                  </div>
                  {track.title}
                </div>
              </TableCell>
              <TableCell>{track.artist}</TableCell>
              <TableCell className="text-right">2:30</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
