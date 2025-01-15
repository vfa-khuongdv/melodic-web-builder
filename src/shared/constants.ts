function shuffleArray<T>(array: T[]): T[] {
  return array
    .map((item) => ({ ...item, sortKey: Math.random() })) // Add a temporary `sortKey`
    .sort((a, b) => a.sortKey - b.sortKey) // Sort based on `sortKey`
    .map(({ sortKey, ...item }) => item) as T[]; // Remove `sortKey` before returning and cast to T[]
}

export const playlists = [
  {
    id: "100000",
    title: "Tết Ổn Rồi",
    artist: "Tết Ổn RồI | Đông Nhi x Hiền Thục x Jun Phạm x Bùi Công Nam | Official MV",
    imageUrl: "https://cdn.tuoitre.vn/thumb_w/480/471584752817336320/2024/1/9/ngoai-4-giong-ca-chinh-dan-nghe-si-tham-gia-mv-tet-on-roi-con-co-le-thien-huynh-lap-1704769932188712945529.png",
    audioUrl: "/assets/TET_ON_ROI.mp3"
  },
  {
    id: "100001",
    title: "TẾT NÀY CON SẼ VỀ",
    artist: "BÙI CÔNG NAM | TẾT NÀY CON SẼ VỀ",
    imageUrl: "https://thanhnien.mediacdn.vn/Uploaded/nguyenvan/2022_01_11/tncsvposter2-6388.jpg",
    audioUrl: "/assets/TET_NAY_CON_SE_VE.mp3"
  },
  {
    id: "100002",
    title: "Tết Đong Đầy",
    artist: "Tết Đong Đầy | KHOA x Kay Tran x Duck V | HOMIE BOIZ OFFICIAL",
    imageUrl: "https://i.ytimg.com/vi/gOtfJ151ue4/maxresdefault.jpg",
    audioUrl: "/assets/Tết Đong Đầy.mp3"
  },
  {
    id: "100003",
    title: " Đi Về Nhà",
    artist: "Đen x JustaTee - Đi Về Nhà (M/V)",
    imageUrl: "https://ss-images.saostar.vn/wpr700/pc/1608710198613/01.jpg",
    audioUrl: "/assets/di_ve_nha.mp3",
  },
  {
    id: "100004",
    title: "DRIP",
    artist: "BABYMONSTER - 'DRIP' M/V",
    imageUrl: "https://www.billboard.com/wp-content/uploads/2024/11/BABYMONSTER-cr-Courtesy-of-YG-Entertainment-press-2024-billboard-1548.jpg?w=942&h=623&crop=1",
    audioUrl: "/assets/DRIP.mp3",
  }
  , ...shuffleArray([
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
      title: "Bring Me Back ft. Claire Ridgely",
      artist: "Miles Away - Bring Me Back ft. Claire Ridgely",
      imageUrl: "https://i.ytimg.com/vi/iWy4W5JLcNo/maxresdefault.jpg",
      audioUrl: "/assets/Bring Me Back.mp3"
    }
  ])];


export const episodes = [
  {
    id: "1",
    title: "Saddam Hussein và hơn 20 năm nắm giữ quyền lực",
    date: "Today",
    duration: "44 min",
    imageUrl: "https://i1.sndcdn.com/artworks-000189872914-92l285-t500x500.jpg",
  },
  {
    id: "2",
    title: "2025 - Mình sống vì điều gì? Êm ru #7",
    date: "Dec 2024",
    duration: "14 min",
    imageUrl: "https://thanhnien.mediacdn.vn/Uploaded/nguyenvan/2022_01_11/tncsvposter2-6388.jpg",
  },
  {
    id: "3",
    title: "Phần 1 - Harry Potter và Hòn Đá Phù Thủy",
    date: "Oct 2023",
    duration: "554 min",
    imageUrl: "https://i.ytimg.com/vi/gOtfJ151ue4/maxresdefault.jpg",
  },
  {
    id: "4",
    title: "#77 Làm sao để vượt qua nỗi đau?",
    date: "Jan 8",
    duration: "17 min",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/1/12/Lady_Gaga_and_Bruno_Mars_-_Die_with_a_Smile.png",
  },
  {
    id: "5",
    title: "#50: 2024",
    date: "Jan 11",
    duration: "34 min",
    imageUrl: "https://www.billboard.com/wp-content/uploads/2024/11/BABYMONSTER-cr-Courtesy-of-YG-Entertainment-press-2024-billboard-1548.jpg?w=942&h=623&crop=1",
  },
  {
    id: "6",
    title: "Saddam Hussein và hơn 20 năm nắm giữ quyền lực",
    date: "Today",
    duration: "44 min",
    imageUrl: "https://i1.sndcdn.com/artworks-000189872914-92l285-t500x500.jpg",
  },
  {
    id: "7",
    title: "2025 - Mình sống vì điều gì? Êm ru #7",
    date: "Dec 2024",
    duration: "14 min",
    imageUrl: "https://thanhnien.mediacdn.vn/Uploaded/nguyenvan/2022_01_11/tncsvposter2-6388.jpg",
  },
  {
    id: "8",
    title: "Phần 1 - Harry Potter và Hòn Đá Phù Thủy",
    date: "Oct 2023",
    duration: "554 min",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/1/12/Lady_Gaga_and_Bruno_Mars_-_Die_with_a_Smile.png",
  },
  {
    id: "9",
    title: "#77 Làm sao để vượt qua nỗi đau?",
    date: "Jan 8",
    duration: "17 min",
    imageUrl: "https://i.ytimg.com/vi/gOtfJ151ue4/maxresdefault.jpg",
  },
  {
    id: "10",
    title: "#50: 2024",
    date: "Jan 11",
    duration: "34 min",
    imageUrl: "https://www.billboard.com/wp-content/uploads/2024/11/BABYMONSTER-cr-Courtesy-of-YG-Entertainment-press-2024-billboard-1548.jpg?w=942&h=623&crop=1",
  },
];