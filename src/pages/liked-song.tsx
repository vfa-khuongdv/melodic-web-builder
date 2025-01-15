import { Sidebar } from "@/components/Sidebar";

const LikedSongUI = () => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 bg-gradient-to-b from-purple-900 to-black text-white">
        {/* Header */}
        <div className="p-6">
          <div className="flex items-center space-x-6">
            {/* Playlist Image */}
            <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-6xl">💜</span>
            </div>

            {/* Playlist Info */}
            <div>
              <h2 className="text-lg uppercase font-semibold text-gray-300">Playlist</h2>
              <h1 className="text-5xl font-bold">Liked Songs</h1>
              <p className="text-sm text-gray-400 mt-2">
                khuongdv • 18 songs
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="px-6 mt-6 flex items-center space-x-6">
          <button className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-2xl">
            ▶
          </button>
        </div>

        {/* Song Table */}
        <div className="px-6 mt-6">
          <table className="w-full text-left">
            <thead className="text-gray-400 text-sm border-b border-gray-700">
              <tr>
                <th className="py-3">#</th>
                <th>Title</th>
                <th>Album</th>
                <th>Date added</th>
                <th className="text-right">Duration</th>
              </tr>
            </thead>
            <tbody>
              {/* Song Rows */}
              {[
                {
                  id: 1,
                  title: "Die With A Smile",
                  artist: "Lady Gaga, Bruno Mars",
                  album: "Die With A Smile",
                  date: "1 week ago",
                  duration: "4:12",
                },
                {
                  id: 2,
                  title: "Không Bằng",
                  artist: "Na",
                  album: "Không Bằng",
                  date: "Nov 7, 2024",
                  duration: "4:13",
                },
                {
                  id: 3,
                  title: "Flashlight",
                  artist: "Jessie J",
                  album: "Flashlight (Pitch Perfect 2)",
                  date: "Oct 4, 2024",
                  duration: "3:29",
                },
                {
                  id: 4,
                  title: "Flowers",
                  artist: "Miley Cyrus",
                  album: "Endless Summer Vacation",
                  date: "Aug 17, 2024",
                  duration: "3:21",
                },
              ].map((song) => (
                <tr
                  key={song.id}
                  className="hover:bg-gray-800 group transition-colors"
                >
                  <td className="py-4 px-3">{song.id}</td>
                  <td className="py-4 px-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src={`https://www.billboard.com/wp-content/uploads/2024/11/BABYMONSTER-cr-Courtesy-of-YG-Entertainment-press-2024-billboard-1548.jpg?w=942&h=623&crop=1`}
                        alt={song.title}
                        className="w-10 h-10 rounded-md"
                      />
                      <div>
                        <h3 className="font-bold text-white group-hover:text-green-500">
                          {song.title}
                        </h3>
                        <p className="text-gray-400 text-sm">{song.artist}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-3 text-gray-400">{song.album}</td>
                  <td className="py-4 px-3 text-gray-400">{song.date}</td>
                  <td className="py-4 px-3 text-right text-gray-400">{song.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LikedSongUI;
