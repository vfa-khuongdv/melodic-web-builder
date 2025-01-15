import { Sidebar } from "@/components/Sidebar";
import { PlayerBar } from "@/components/PlayerBar";
import { PlaylistCard } from "@/components/PlaylistCard";
import { playlists } from "../shared/constants";
import { TopTracks } from "@/components/ui/top-track";

const features = [...playlists];
const recentlyPlayed = [...playlists.slice(0, 4)]

const Index = () => {

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto animate-fade-in">
          <h1 className="text-3xl font-bold mb-6">Good morning</h1>

          <section className="mb-8">
            <TopTracks />
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Featured Playlists</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {features.map((playlist) => (
                <PlaylistCard key={playlist.title} {...playlist} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Recently Played</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-20">
              {recentlyPlayed.map((playlist) => (
                <PlaylistCard key={playlist.title} {...playlist} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <PlayerBar />
    </div>
  );
};

export default Index;