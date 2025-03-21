import { Sidebar } from "@/components/Sidebar";
import { PlayerBar } from "@/components/PlayerBar";
import { PlaylistCard } from "@/components/PlaylistCard";
import { playlists } from "../shared/constants";
import { Ranking } from "@/components/Ranking";


const Index = () => {

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gradient-to-b from-spotify-light to-spotify-dark p-6">
        <div className="max-w-7xl mx-auto animate-fade-in">
          <h1 className="text-3xl font-bold mb-6">Good morning</h1>

          <section className="mb-8">
            <Ranking tracks={playlists.splice(4, 5)} />
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Featured Playlists</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {playlists.map((playlist) => (
                <PlaylistCard key={playlist.title} {...playlist} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Recently Played</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-20">
              {playlists.slice(0, 4).map((playlist) => (
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