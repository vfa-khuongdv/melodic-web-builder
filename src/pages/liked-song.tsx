import { PlayerBar } from "@/components/PlayerBar";
import { Sidebar } from "@/components/Sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Track, useAudio } from "@/contexts/AudioContext";
import { playlists } from "@/shared/constants";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Play, Shuffle, Download, Search, List, Pause } from "lucide-react";
import React from "react";

// Define the type for a Song
interface Song extends Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  date: string;
  duration: string;
}


// Header Component
const Header = () => (
  <div className="p-6">
    <div className="flex items-center space-x-6">
      <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
        <span className="text-6xl">💜</span>
      </div>
      <div>
        <h2 className="text-lg uppercase font-semibold text-gray-300">Playlist</h2>
        <h1 className="text-5xl font-bold">Liked Songs</h1>
        <p className="text-sm text-gray-400 mt-2">khuongdv • 18 songs</p>
      </div>
    </div>
  </div>
);

type ControlsProps = {
  isPlaying: boolean,
  playlists: Song[]
  play: (song: Song) => void
}

// Controls Component
const Controls: React.FC<ControlsProps> = ({ isPlaying, playlists, play }) => (
  < div className="flex items-center gap-4" >
    <button
      className={`text-white p-2 rounded-full bg-green-500 hover:bg-green-400 transition duration-300`}
      aria-label={isPlaying ? "Pause" : "Play"}
      onClick={() => play(playlists[0])}
    >
      {isPlaying ? (
        <Pause size={40} />
      ) : (
        <Play size={40} />
      )}
    </button>
    <button className="hover:text-gray-400">
      <Shuffle size={20} />
    </button>
    <button className="hover:text-gray-400">
      <Download size={20} />
    </button>
  </div >
);

// SearchInput Component
const SearchInput = () => (
  <div className="relative group">
    <div className="flex items-center absolute -top-1 right-0 bg-gray-700 text-white rounded-lg py-2 px-4 w-0 opacity-0 transition-all duration-300 group-hover:w-48 group-hover:opacity-100">
      <Search size={20} className="text-gray-400 mr-2" />
      <input
        type="text"
        placeholder="Search in playlist"
        className="bg-transparent w-full text-sm text-white placeholder-gray-400 focus:outline-none"
      />
    </div>
    <Search size={20} className="text-gray-400 cursor-pointer" />
  </div>
);

// DropdownSortMenu Component
const DropdownSortMenu = () => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild>
      <button className="text-sm ml-2 text-gray-400 flex items-center hover:text-white">
        Date added <List className="ml-1" size={20} />
      </button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content
      className="bg-gray-800 px-2 py-2 text-white rounded-md shadow-lg w-48"
      sideOffset={5}
    >
      {["Title", "Artist", "Album", "Date added"].map((item, index) => (
        <DropdownMenu.Item
          key={index}
          className="text-sm text-gray-400 px-4 py-2 cursor-pointer hover:bg-gray-700 hover:text-white"
        >
          {item}
        </DropdownMenu.Item>
      ))}
      <DropdownMenu.Separator className="h-px bg-gray-600 my-1" />
      {["Compact", "List"].map((item, index) => (
        <DropdownMenu.Item
          key={index}
          className={`text-sm px-4 py-2 cursor-pointer hover:bg-gray-700 ${item === "List" ? "text-green-500" : "text-gray-400"
            }`}
        >
          {item}
        </DropdownMenu.Item>
      ))}
    </DropdownMenu.Content>
  </DropdownMenu.Root>
);

const SongRow = ({ song }: { song: Song }) => (
  <TableRow>
    <TableCell>{song.id}</TableCell>
    <TableCell className="flex items-center space-x-3">
      <img
        src={song.imageUrl}
        alt={song.title}
        className="w-10 h-10 rounded-md"
      />
      <div>
        <h3 className="font-bold text-white">{song.title}</h3>
        <p className="text-sm text-muted-foreground">{song.artist}</p>
      </div>
    </TableCell>
    <TableCell className="text-muted-foreground">{song.album}</TableCell>
    <TableCell className="text-muted-foreground">{song.date}</TableCell>
    <TableCell className="text-right text-muted-foreground">{song.duration}</TableCell>
  </TableRow>
);

const SongTable = ({ songs }: { songs: Song[] }) => (
  <Table className="w-full mb-20">
    <TableHeader>
      <TableRow>
        <TableHead>#</TableHead>
        <TableHead>Title</TableHead>
        <TableHead>Album</TableHead>
        <TableHead>Date Added</TableHead>
        <TableHead className="text-right">Duration</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {songs.map((song) => (
        <SongRow key={song.id} song={song} />
      ))}
    </TableBody>
  </Table>
);

// Main Component
const LikedSongUI = () => {
  const songs: Song[] = playlists.map((track, index) => ({
    id: (index + 1).toString(),
    title: track.title,
    artist: track.artist,
    album: track.artist,
    date: "2023-01-01",
    duration: "3:30",
    imageUrl: track.imageUrl,
    audioUrl: track.audioUrl,
  }));

  const { play } = useAudio();

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 px-3 py-3 bg-gradient-to-b from-purple-900 to-black text-white">
        <Header />
        <div className="flex justify-between items-center p-4 rounded-lg">
          <Controls isPlaying={false} play={play} playlists={songs} />
          <div className="flex items-center gap-4">
            <SearchInput />
            <DropdownSortMenu />
          </div>
        </div>
        <SongTable songs={songs} />
      </div>
      <PlayerBar />
    </div>
  );
};

export default LikedSongUI;
