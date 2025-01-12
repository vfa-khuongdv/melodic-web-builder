function shuffleArray<T>(array: T[]): T[] {
  return array
    .map((item) => ({ ...item, sortKey: Math.random() })) // Add a temporary `sortKey`
    .sort((a, b) => a.sortKey - b.sortKey) // Sort based on `sortKey`
    .map(({ sortKey, ...item }) => item) as T[]; // Remove `sortKey` before returning and cast to T[]
}

export const playlists = [
  {
    id: "12",
    title: "TẾT NÀY CON SẼ VỀ",
    artist: "BÙI CÔNG NAM | TẾT NÀY CON SẼ VỀ | OFFICIAL MUSIC VIDEO",
    imageUrl: "https://thanhnien.mediacdn.vn/Uploaded/nguyenvan/2022_01_11/tncsvposter2-6388.jpg",
    audioUrl: "/assets/TẾT NÀY CON SẼ VỀ.mp3"
  }
  , ...shuffleArray([
    {
      id: "1",
      title: "DRIP",
      artist: "BABYMONSTER - 'DRIP' M/V",
      imageUrl: "https://www.billboard.com/wp-content/uploads/2024/11/BABYMONSTER-cr-Courtesy-of-YG-Entertainment-press-2024-billboard-1548.jpg?w=942&h=623&crop=1",
      audioUrl: "/assets/DRIP.mp3",
    },
    {
      id: "2",
      title: "Die With A Smile",
      artist: "Lady Gaga, Bruno Mars - Die With A Smile",
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/1/12/Lady_Gaga_and_Bruno_Mars_-_Die_with_a_Smile.png",
      audioUrl: "/assets/Die_With_A_Smile.mp3",
    },
    {
      id: "3",
      title: "APT",
      artist: "ROSÉ & Bruno Mars - APT.",
      imageUrl: "https://i.ytimg.com/vi/ekr2nIex040/maxresdefault.jpg",
      audioUrl: "/assets/APT.mp3",
    },
    {
      id: "4",
      title: "ROCKSTAR",
      artist: "LISA - ROCKSTAR",
      imageUrl: "https://www.billboard.com/wp-content/uploads/2024/04/Lalisa-Manobal-press-credit-Mikey-Asanin-2024-billboard-1548.jpg",
      audioUrl: "/assets/ROCKSTAR.mp3",
    },
    {
      id: "5",
      title: "UP",
      artist: "UP - (KARINA Solo)",
      imageUrl: "https://i.ytimg.com/vi/U1_0Vc-9mNw/hq720.jpg",
      audioUrl: "/assets/UP (KARINA Solo).mp3",
    },
    {
      id: "6",
      title: "One Last Time",
      artist: "Ariana Grande - One Last Time",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS8PMKKoQnxwV4GSNwfprT6ySdNiVUH4qf8Q&s",
      audioUrl: "/assets/One Last Time.mp3"
    },
    {
      id: "7",
      title: "Flowers",
      artist: "Miley Cyrus - Flowers",
      imageUrl: "https://pretavoir.co.uk/cdn/shop/articles/MILEY_CYRUS_FLOWERS.png?v=1674751436",
      audioUrl: "/assets/Flowers.mp3"
    },
    {
      id: "8",
      title: "Bluebird",
      artist: "Ikimono Gakari",
      imageUrl: "https://i1.sndcdn.com/artworks-000189872914-92l285-t500x500.jpg",
      audioUrl: "/assets/Bluebird.mp3"
    },
    {
      id: "9",
      title: "Loving This Moment",
      artist: "Gamma Skies - Loving This Moment",
      imageUrl: "https://i1.sndcdn.com/artworks-bREtRSKy4L42-0-t500x500.png",
      audioUrl: "/assets/Gamma Skies - Loving This Moment.mp3"
    },
    {
      id: "10",
      title: "Không Bằng",
      artist: "Không Bằng - Na Ngọc Anh",
      imageUrl: "https://i1.sndcdn.com/artworks-glAxMxnzuPDADJLT-Gvx47Q-t500x500.jpg",
      audioUrl: "/assets/Không Bằng.mp3"
    },
    {
      id: "11",
      title: "Tết Đong Đầy",
      artist: "Tết Đong Đầy | KHOA x Kay Tran x Duck V | HOMIE BOIZ OFFICIAL",
      imageUrl: "https://i.ytimg.com/vi/gOtfJ151ue4/maxresdefault.jpg",
      audioUrl: "/assets/Tết Đong Đầy.mp3"
    },
  ])];
