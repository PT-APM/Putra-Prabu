import type { NewsArticle, Service, Leader } from "@/types";

// Mock Data

const MOCK_NEWS : NewsArticle[] = [

];

// const MOCK_NEWS: NewsArticle[] = [
//   {
//     id: '1',
//     title: 'Peresmian Gedung Pustaka Digital Berbasis Nilai Keislaman',
//     summary: 'Yayasan Putra Prabu Indonesia Raya dengan bangga meresmikan fasilitas perpustakaan digital baru yang menggabungkan akses literasi global dengan kurasi konten keislaman yang komprehensif, bertujuan untuk melahirkan generasi cendekiawan muda yang tangguh.',
//     date: '12 Oktober 2024',
//     category: 'Pendidikan',
//     imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEhzVR3NwQvm1g_5xDUHak27U2FkayX3EZh7uG9x5k6pXdQ30G2RWPNBTrJdlKBt5QKlxTUm9wdBjrk1uKDmRL9hn_6DYYxDlCZ0Hk2VpaZiAG9x1Rt-x5fPagZh1AqZjbYuzFKMiP3ugv7yP9qGnbCkcVhDHaQ2GyhqK8TJl3DnJOkjozbZn-GtodKCpWczwABse-EaJETztI6E7N4yFicWTrGgb85ft5IZeDSmsM6EQwjHQnrgXC',
//     content: `Medan, 12 Oktober 2024 — Yayasan Putra Prabu Indonesia Raya dengan bangga meresmikan fasilitas terbaru bagi para peserta didik: Gedung Pustaka Digital. Fasilitas ini dirancang untuk menjawab tantangan era informasi modern sambil tetap mengedepankan nilai-nilai keislaman yang menjadi fondasi lembaga pendidikan ini.\n\nMenggabungkan Tradisi dan Teknologi\n\nPeresmian yang dihadiri oleh jajaran pengurus yayasan, tokoh masyarakat, serta perwakilan dinas pendidikan setempat ini berlangsung khidmat. Gedung dua lantai ini tidak hanya menyediakan ribuan literatur cetak, tetapi juga akses ke berbagai jurnal ilmiah, e-book, dan arsip digital melalui terminal komputer interaktif.\n\n"Kami percaya bahwa literasi adalah kunci peradaban. Dengan Pustaka Digital ini, kami ingin memastikan bahwa anak-anak kita memiliki akses tak terbatas ke ilmu pengetahuan, sekaligus dipandu oleh literatur keislaman yang mendalam," ujar Ketua Yayasan dalam sambutannya.\n\nFasilitas Modern untuk Generasi Masa Depan\n\nLebih dari sekadar tempat membaca, Pustaka Digital ini juga dilengkapi dengan ruang diskusi kedap suara, area baca komunal, serta pojok multimedia. Hal ini sejalan dengan visi yayasan untuk menciptakan lingkungan belajar yang kolaboratif dan nyaman.\n\nDiharapkan, dengan beroperasinya fasilitas ini, semangat literasi di kalangan siswa dan masyarakat sekitar dapat meningkat, membawa Yayasan Putra Prabu Indonesia Raya selangkah lebih maju dalam mencetak generasi cerdas dan berakhlak mulia.`
//   },
//   {
//     id: '2',
//     title: 'Program Bantuan Sembako Kuartal Keempat Disalurkan',
//     summary: 'Distribusi bantuan kebutuhan pokok berjalan lancar menjangkau lebih dari 500 keluarga prasejahtera di wilayah Sumatera Utara sebagai bagian dari komitmen sosial yayasan.',
//     date: '05 Oktober 2024',
//     category: 'Sosial',
//     imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCs_teWJpeB4-RND8Ca2XpJmyiOjRkHcaUcJL1YxInBnhU1VWu1ehZ1TH0aUCphqA-ianzNZbKPORdKYCPkyIruR5AwWXyWkU-abpAL92zdYFg28N7O7lA5bvxAOyN4YNHlEq9U1uoXjhHXc3WZbXNPUy0x5jkV1thf7KruxpOscFpQQgoYx7G8BVIrWWFls2wb6U_kL1gXaoR_aMSiUhCXfF4wa8rNSUQACJ4MFDHc0Kg3NT5lFqqq'
//   },
//   {
//     id: '3',
//     title: 'Workshop Literasi Digital untuk Santri dan Pelajar',
//     summary: 'Membekali generasi muda dengan keterampilan abad 21 melalui pemahaman literasi digital yang etis dan berlandaskan nilai-nilai agama Islam.',
//     date: '28 September 2024',
//     category: 'Teknologi',
//     imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_2VYAect1clGRiBfDtKEM6uPYhxxpRX0mupZHEaB2IQq68GfsSackYLiKfs85-qDXiIrrlHdViW7w6d_Xzrq--uO4iaVR_BHYGCkXukfVgoi64bd2D6RgGPsElKmgMoP_q2NCOzmBHktvv9J8Pgm4nkRbaArWrQufJXCd0PzXznrTCGePAqqQ9fxufQ5NmMP43snt6C0S1uFReJZiVfT5Wrj-iiH_nQzY6X1ebJy62jJHfjcd3cdx'
//   },
//   {
//     id: '4',
//     title: 'Renovasi Fasilitas Ibadah Menuju Ramah Lingkungan',
//     summary: 'Inisiatif terbaru yayasan dalam memugar masjid binaan dengan menerapkan konsep bangunan hijau (green building) untuk efisiensi energi dan air.',
//     date: '15 September 2024',
//     category: 'Kegiatan',
//     imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDG0fRR9LBfrc8oqBvqv-LIw3yjgO4n6_dHarOSMOFsKLJ492jGJ5I_DW3zSbojcFV2cIsADl_gVtWg4T-WTHk8GHnK6pr-auI40Tiji4y1hFStMzmGYelGwRF1h2199tGclfDyY5H62Y6Pq__lLvprsz0rXbUKURXASC33LozeDB-1CPidwLVLTE-yZ785aiggV2epA1_KzRBKn6X42b9tMqJrQdzN-d2xSqhvIyxu_fcy8brnFqMi'
//   }
// ];

const MOCK_SERVICES: Service[] = [
  {
    id: '1',
    title: 'Pendidikan Kelompok Bermain',
    description: 'Membentuk karakter Islami sejak dini dengan metode pembelajaran yang menyenangkan dan interaktif.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4yoPRmbCkKBQYGeOj2WEfw00j2Gckw7gLIuqzKpnPDre8j81j_ZPjUFuz7_0BEUSwAco5ccP36Ih9NVo_coqHQi3upaMRyN4-UIdh7ZgMaaUSfZqn_fXlfL9Cwe3kUVuUb3VUGAVk90RpdTW9NZN7wtK67hpXdTxhc6-eBIjwLJmgG3xJDemwdhFI6bowL2eAiUII9kNiNUZ05P7txr1OsUTRIS3SeNhYPki8tiH70S0GsTCVurA2'
  },
  {
    id: '2',
    title: 'Sekolah Dasar (SD)',
    description: 'Pendidikan dasar yang mengintegrasikan kurikulum nasional dengan pemahaman agama yang mendalam.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS4IkFA13Hzy3dQyetIGJhRu3GRtNnNK40emx2Ndiq9oQLDLDnvGlkpUkwUkt1Y2E78v9vAJvPNVFC9dtT8RQyLOGDZdr0-gp0h0OaCmWXsEFBzdLm74ndBFxVl9BLAhTmj5o97v2tEXE5NZ0EKrp16RF9r-RXdiijsenhUs_J68W7kEBo4qWAQLdshz6WqcUO-Ha-2SUq_7QXmPocO4NdU2DEGks3SmLCQlaRGSMl5sfSLgiLPHsi'
  },
  {
    id: '3',
    title: 'Sekolah Menengah Pertama (SMP)',
    description: 'Mempersiapkan remaja dengan bekal ilmu pengetahuan umum dan adab yang berlandaskan Al-Qur\'an dan Sunnah.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLrNy4Fq3Ktomo_63W03jq2bYUY7ifniJSmUGA8eo9yX62etBxxk6O1VnHgiWl5b4UEqg-J7_wiZ8jy6vdTMhcQ6GLlNP13cIiFCUPb8qvHKDRjazO55lwWIs7ZlPBd_VuXrxrfczq7gdognGdY7eKPJDz0p4t7p1D-ZRCG7s_wLsANSNulDN_YnxuO07aqrP0FJt6UuIlaVmOTFvmFN56nJbNBHOJvk6rYBglj2agwHTo4R0BYZG9'
  },
  {
    id: '4',
    title: 'Sekolah Menengah Atas (SMA)',
    description: 'Pendidikan tingkat lanjut yang berfokus pada keunggulan akademik, kepemimpinan, dan kesiapan masuk perguruan tinggi.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAalj1gaK7qCL48KTAR6K_ORYqmZWFr3Zx_uAvAzaF_qPurKG1hKFls48VloIUkeOJOAcj_krhCRM7geYgnbtoiHKGB7kFCelb65UydnoABYNfznTCSvsHFR1pUI6STDpFd1ZQ4TVcI0vqCFXoVzs8XCgKtYL15z_jXY0r0qni1kYlfG1GOmwFohc5VolCfeyZRmVG1XkLF7VbiTKz-pKmPgTWiMu4CqUlshUq-vnQoLQBbB5rhZ3P6'
  },
  {
    id: '5',
    title: 'Penelitian & Pengembangan (Electricity)',
    description: 'Inovasi teknologi dan penelitian berkelanjutan dalam bidang kelistrikan untuk kemaslahatan umat.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoeBYa0k9XGxebHYCu_wqORu9JuKDtkiq0V1pTuV0W7z-nRa6vdiEZhQYGGxQ8mXP3DxBluJ3ysTFAybERVQwELgOCxPY2aE8qTUyV5a_ay7ZU327yRiTTjKRwcefaVs8u4-y9Qe4fdoG2Os39Sus6lXlskkBaB_PiMBfdoGLthztlzZd9BjClxp4WdsuVwZIGhXVoUqb7o1jduBLvKrMZiSmcKhykMKdvgH3tPSwhhIpYgkPxM9aZ'
  },
  {
    id: '6',
    title: 'Penyediaan Jasa Boga',
    description: 'Layanan katering profesional yang terjamin kehalalan, kebersihan, dan cita rasanya untuk berbagai kebutuhan.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkiarBki8qxi60E1XuszdfKUDhMZi4FTplTrbKRjAL78kwWLFu7DHBII5sriTrOfLTir5lE-wTthH5e7ULBHD5fk1mlk74u_VADGJqJvDID77pvhTrdmJMQMkQIc8NGgpqArWuPioWGaBtZhS_lxePNezlS0W_rxMHnO1yDXCWqLxwCdNwJ59zFdzAgMb_4uNTCGo1BKxpRNAgigYdpyVWdxP7sgV8pcPMUeixz0laq-wpmVYpEJHd'
  }
];

const MOCK_LEADERSHIP: Leader[] = [
  {
    id: '1',
    name: 'Priyo Iswanto',
    role: 'Ketua Pembina',
    group: 'Pembina',
    imageUrl: 'priyo.jpg'
  },
  {
    id: '2',
    name: 'Abdul Razaq Ananda Azwi',
    role: 'Ketua Pengawas',
    group: 'Pengawas',
    imageUrl: 'razaq.jpg'
  },
  {
    id: '3',
    name: 'Hari Mulyono',
    role: 'Ketua',
    group: 'Pengurus Harian',
    imageUrl: 'hari.jpeg'
  },
  {
    id: '4',
    name: 'Ir. Muhammad Azhari, SH, MH',
    role: 'Sekretaris',
    group: 'Pengurus Harian',
    imageUrl: 'azhari.jpg'
  },
  {
    id: '5',
    name: 'Annisa Rahima Ananda Azwi',
    role: 'Bendahara',
    group: 'Pengurus Harian',
    imageUrl: 'anissa.jpeg'
  }
];

// Repository Pattern Implementation
export const repository = {
  news: {
    getAll: (): NewsArticle[] => MOCK_NEWS,
    getLatest: (count: number): NewsArticle[] => MOCK_NEWS.slice(0, count),
    getById: (id: string): NewsArticle | undefined => MOCK_NEWS.find(n => n.id === id)
  },
  services: {
    getAll: (): Service[] => MOCK_SERVICES
  },
  leadership: {
    getAll: (): Leader[] => MOCK_LEADERSHIP,
    getByGroup: (group: Leader['group']): Leader[] => MOCK_LEADERSHIP.filter(l => l.group === group)
  }
};
