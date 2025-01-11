import { Sidebar } from "@/components/Sidebar";
import { PlayerBar } from "@/components/PlayerBar";
import { PlaylistCard } from "@/components/PlaylistCard";

const playlists = [
  {
    title: "Today's Top Hits",
    description: "Jung Kook is on top of the Hottest 50!",
    imageUrl: "https://picsum.photos/seed/1/300",
  },
  {
    title: "RapCaviar",
    description: "New music from Drake, Travis Scott and more.",
    imageUrl: "https://picsum.photos/seed/2/300",
  },
  {
    title: "All Out 2010s",
    description: "The biggest songs of the 2010s.",
    imageUrl: "https://picsum.photos/seed/3/300",
  },
  {
    title: "Rock Classics",
    description: "Rock legends & epic songs that continue to inspire generations.",
    imageUrl: "https://picsum.photos/seed/4/300",
  },
  {
    title: "Chill Hits",
    description: "Kick back to the best new and recent chill hits.",
    imageUrl: "https://picsum.photos/seed/5/300",
  },
  {
    title: "Viva Latino",
    description: "Today's top Latin hits, elevando nuestra música.",
    imageUrl: "https://picsum.photos/seed/6/300",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gradient-to-b from-spotify-light to-spotify-dark p-6">
        <div className="max-w-7xl mx-auto animate-fade-in">
          <h1 className="text-3xl font-bold mb-6">Good evening</h1>
          
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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