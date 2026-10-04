import { 
  OrganizationInfo, 
  Announcement, 
  Member, 
  Activity, 
  AgendaEvent, 
  NewsArticle, 
  GalleryItem, 
  Achievement, 
  UMKMProduct, 
  ProgramKerja, 
  FinancialRecord, 
  TaskItem, 
  PiketSchedule, 
  Certificate, 
  RegistrationSubmission,
  AdminUser,
  SiteAppearanceConfig,
  SecuritySettings,
  GmailSyncInfo,
  SecurityLog
} from '../types';

export const UNIFIED_ADMIN_PASSWORD = 'tridharma2026';

export const INITIAL_ORG_INFO: OrganizationInfo = {
  name: 'Muda-Mudi Tri Dharma Manunggal',
  shortName: 'TDM RW 1',
  tagline: 'Ra mangan ra jalan',
  secondaryTagline: 'Pemuda bergerak, masyarakat berdampak.',
  village: 'Pojok',
  rw: 'RW 01',
  subdistrict: 'Tawangsari',
  regency: 'Sukoharjo',
  province: 'Jawa Tengah',
  foundedYear: 2018,
  primaryColor: 'Biru dan Putih',
  contactPerson: 'Surya Jati P (Ketua Umum)',
  whatsapp: '+62 857-4726-3684',
  email: 'tridharmamanunggalrw1@gmail.com', // Updated official email
  instagram: 'https://www.instagram.com/tdm_rw1?stkn=MWVndWZ1ajVkYm05dQ==',
  tiktok: 'https://www.tiktok.com/@tdm_rw1_pojok',
  youtube: 'https://www.youtube.com/@TriDharmaManunggalRW1',
  facebook: 'https://www.facebook.com/tdm.pojok.rw1',
  secretariatAddress: 'Gedung Pertemuan Balai RW 01, Desa Pojok, Kec. Tawangsari, Kab. Sukoharjo, Jawa Tengah 57561',
  mapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15814.776626601449!2d110.8351543!3d-7.6974868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a3ec5cb239f19%3A0x5027a76e356c9a0!2sPojok%2C%20Tawangsari%2C%20Sukoharjo%20Regency%2C%20Central%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid'
};

export const INITIAL_ANNOUNCEMENT: Announcement = {
  id: 'ann-1',
  text: '📢 Rapat Rutin & Koordinasi Kerja Bakti Bersama Pemuda RW 1 akan dilaksanakan Sabtu, 10 Oktober 2026 pukul 19.30 WIB di Balai RW 01.',
  date: '2026-10-01',
  isActive: true,
  linkText: 'Lihat Agenda',
  targetTab: 'agenda'
};

export const INITIAL_MEMBERS: Member[] = [
  {
    id: 'mem-1',
    name: 'Surya Jati P',
    nickname: 'Surya',
    role: 'Ketua Umum',
    division: 'Pengurus Harian',
    joinedYear: 2018,
    status: 'Aktif',
    whatsapp: '+62 857-4726-3684',
    instagram: 'suryajati_p',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    isCoordinator: true,
    bio: 'Mengkoordinasi seluruh kegiatan pemuda dan menjadi jembatan antara karang taruna dengan perangkat desa serta sesepuh RW 1.'
  },
  {
    id: 'mem-2',
    name: 'Bagas Aditya Nugroho',
    nickname: 'Bagas',
    role: 'Wakil Ketua',
    division: 'Pengurus Harian',
    joinedYear: 2019,
    status: 'Aktif',
    whatsapp: '+62 812-3456-7890',
    instagram: 'bagasaditya_n',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    isCoordinator: true,
    bio: 'Mendampingi ketua dan mengawasi jalannya seluruh program kerja di 10 divisi pemuda.'
  },
  {
    id: 'mem-3',
    name: 'Anisa Ratna Dewi',
    nickname: 'Ratna',
    role: 'Sekretaris 1',
    division: 'Kesekretariatan',
    joinedYear: 2020,
    status: 'Aktif',
    whatsapp: '+62 856-7890-1234',
    instagram: 'ratnadewi_an',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    isCoordinator: true,
    bio: 'Bertanggung jawab atas surat-menyurat resmi, notulensi rapat, dan arsip data keanggotaan.'
  },
  {
    id: 'mem-4',
    name: 'Dinda Ayu Safitri',
    nickname: 'Dinda',
    role: 'Sekretaris 2',
    division: 'Kesekretariatan',
    joinedYear: 2021,
    status: 'Aktif',
    whatsapp: '+62 858-1234-5678',
    instagram: 'dindaayus_',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    isCoordinator: false,
    bio: 'Membantu pengelolaan pendaftaran anggota baru dan penyusunan proposal kegiatan.'
  },
  {
    id: 'mem-5',
    name: 'Fajar Kurniawan S.E.',
    nickname: 'Fajar',
    role: 'Bendahara 1',
    division: 'Keuangan',
    joinedYear: 2019,
    status: 'Aktif',
    whatsapp: '+62 821-9876-5432',
    instagram: 'fajarkurniawan_se',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    isCoordinator: true,
    bio: 'Mengelola buku kas organisasi, laporan keuangan bulanan yang transparan, dan pos dana kas RW 1.'
  },
  {
    id: 'mem-6',
    name: 'Rina Nur Lestari',
    nickname: 'Rina',
    role: 'Bendahara 2',
    division: 'Keuangan',
    joinedYear: 2022,
    status: 'Aktif',
    whatsapp: '+62 813-8899-7711',
    instagram: 'rinanurlestari_',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    isCoordinator: false,
    bio: 'Membantu penarikan iuran rutin anggota dan pencatatan bukti kuitansi pengeluaran.'
  },
  {
    id: 'mem-7',
    name: 'Rizky Wahyu Pratama',
    nickname: 'Rizky',
    role: 'Koordinator PDD & Media',
    division: 'Divisi PDD / Media',
    joinedYear: 2020,
    status: 'Aktif',
    whatsapp: '+62 896-1234-9988',
    instagram: 'rizkywp_creative',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    isCoordinator: true,
    bio: 'Bertanggung jawab atas dokumentasi foto, video reel Instagram @tdm_rw1, dan branding visual pemuda.'
  },
  {
    id: 'mem-8',
    name: 'Dimas Aji Prasetyo',
    nickname: 'Dimas',
    role: 'Koordinator Olahraga',
    division: 'Divisi Olahraga',
    joinedYear: 2019,
    status: 'Aktif',
    whatsapp: '+62 852-3344-5566',
    instagram: 'dimas_volly1',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    isCoordinator: true,
    bio: 'Mengkoordinasi latihan bola voli rutin setiap sore, tenis meja di balai RW, dan turnamen olahraga antar RT.'
  },
  {
    id: 'mem-9',
    name: 'Ilham Syahputra',
    nickname: 'Ilham',
    role: 'Koordinator Sosial & Kerohanian',
    division: 'Divisi Sosial & Keagamaan',
    joinedYear: 2021,
    status: 'Aktif',
    whatsapp: '+62 878-5544-3322',
    instagram: 'ilhamsyahputra_',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    isCoordinator: true,
    bio: 'Memimpin program bakti sosial, santunan yatim, takziah gotong royong, dan kajian pemuda bulanan.'
  },
  {
    id: 'mem-10',
    name: 'Tri Wahyudi',
    nickname: 'Yudi',
    role: 'Koordinator Lingkungan Hidup',
    division: 'Divisi Lingkungan',
    joinedYear: 2021,
    status: 'Aktif',
    whatsapp: '+62 815-7766-5544',
    instagram: 'yudi_triw',
    photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    isCoordinator: true,
    bio: 'Menjadwalkan kerja bakti bersih desa, pengelolaan pilah sampah plastik, dan penghijauan jalan RW 1.'
  },
  {
    id: 'mem-11',
    name: 'Siti Nur Aisyah',
    nickname: 'Aisyah',
    role: 'Koordinator Kewirausahaan & UMKM',
    division: 'Divisi Kewirausahaan',
    joinedYear: 2022,
    status: 'Aktif',
    whatsapp: '+62 822-4455-6677',
    instagram: 'siti_aisyahumkm',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    isCoordinator: true,
    bio: 'Mengembangkan etalase pasar UMKM pemuda RW 1 Pojok, bazaar pasar kaget, dan pelatihan bisnis mandiri.'
  },
  {
    id: 'mem-12',
    name: 'Bayu Saputra',
    nickname: 'Bayu',
    role: 'Koordinator Humas & Hubungan Warga',
    division: 'Divisi Humas',
    joinedYear: 2020,
    status: 'Aktif',
    whatsapp: '+62 859-1122-3344',
    instagram: 'bayusaputra_rw1',
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    isCoordinator: true,
    bio: 'Menyambungkan informasi ke Ketua RT 1, 2, 3, dan 4 di lingkungan RW 1 serta tokoh masyarakat Tawangsari.'
  }
];

export const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: 'act-1',
    title: 'Kerja Bakti Akbar Bersih Saluran Air & Drainase RW 1',
    category: 'Sosial',
    date: '2026-09-22',
    year: 2026,
    location: 'Lingkungan RT 01-04 RW 01 Desa Pojok',
    description: 'Pembersihan endapan sedimentasi selokan sepanjang 500 meter menyambut musim penghujan.',
    fullContent: 'Semangat gotong royong pemuda Tri Dharma Manunggal bersama sesepuh dan warga RW 1 sukses membersihkan aliran air dan menata pepohonan di pinggir jalan utama.',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    status: 'Terlaksana',
    participantCount: 75
  },
  {
    id: 'act-2',
    title: 'Turnamen Bola Voli Antar Karang Taruna Tawangsari',
    category: 'Olahraga',
    date: '2026-09-10',
    year: 2026,
    location: 'Lapangan Voli RW 01 Desa Pojok',
    description: 'Pertandingan persahabatan penuh sportivitas yang mengantarkan kontingen TDM meraih Juara 2.',
    fullContent: 'Ajang pembuktian regenerasi atlet muda Desa Pojok dalam turnamen bergengsi tingkat kecamatan.',
    imageUrl: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=800&q=80',
    status: 'Terlaksana',
    participantCount: 120
  }
];

export const INITIAL_AGENDA: AgendaEvent[] = [
  {
    id: 'ag-1',
    title: 'Rapat Pleno & Evaluasi Kegiatan Bulanan',
    date: '2026-10-10',
    time: '19:30 - 22:00 WIB',
    location: 'Balai RW 01 Desa Pojok',
    personInCharge: 'Surya Jati P (Ketua Umum)',
    category: 'Rapat',
    notes: 'Membahas laporan keuangan bulan September, persiapan Hari Sumpah Pemuda, dan iuran kas rutin.',
    status: 'Akan Datang'
  },
  {
    id: 'ag-2',
    title: 'Latihan Bersama Bola Voli Pemuda Sore',
    date: '2026-10-14',
    time: '16:00 - 17:45 WIB',
    location: 'Lapangan Voli RW 01',
    personInCharge: 'Dimas Aji Prasetyo',
    category: 'Kegiatan',
    notes: 'Persiapan uji tanding persahabatan melawan pemuda Desa Kenep.',
    status: 'Akan Datang'
  },
  {
    id: 'ag-3',
    title: 'Aksi Bersih Desa & Kerja Bakti Pekarangan',
    date: '2026-10-18',
    time: '06:30 - 09:30 WIB',
    location: 'Lingkungan RT 01, 02, 03, 04 / RW 01',
    personInCharge: 'Tri Wahyudi (Div. Lingkungan)',
    category: 'Kegiatan',
    notes: 'Diharapkan membawa sapu lidi, cangkul, dan sabit. Konsumsi teh hangat dan gorengan disediakan kas.',
    status: 'Akan Datang'
  },
  {
    id: 'ag-4',
    title: 'Peringatan Hari Sumpah Pemuda & Diskusi Santai',
    date: '2026-10-28',
    time: '19:30 - 22:30 WIB',
    location: 'Gedung RW 01 Pojok',
    personInCharge: 'Bagas Aditya (Wakil Ketua)',
    category: 'Event Warga',
    notes: 'Sarasehan pemuda mengusung tema "Ra Mangan Ra Jalan: Filosofi Guyub Rukun Pemuda Masa Kini".',
    status: 'Akan Datang'
  }
];

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Guyub Rukun Pemuda RW 1: Kerja Bakti Saluran Air Sambut Musim Penghujan',
    date: '22 September 2026',
    author: 'Tim Media PDD TDM',
    category: 'Sosial & Lingkungan',
    summary: 'Puluhan pemuda-pemudi Tri Dharma Manunggal turun langsung membersihkan gorong-gorong dan selokan utama sepanjang 500 meter di RW 1 Desa Pojok.',
    content: 'DESA POJOK — Semangat gotong royong terus dijaga oleh organisasi pemuda Muda-Mudi Tri Dharma Manunggal RW 1 Desa Pojok, Kecamatan Tawangsari, Kabupaten Sukoharjo. Pada Minggu pagi lalu, puluhan anggota bersama warga serentak melaksanakan kerja bakti pembersihan saluran drainase.\n\nKetua TDM, Surya Jati P, menyampaikan bahwa kegiatan ini merupakan bentuk kepedulian nyata generasi muda terhadap kelancaran aliran air dan pencegahan genangan saat musim hujan tiba. "Semboyan kami  Ra mangan ra jalan  memiliki arti mendalam: kebersamaan harus diawali dengan kesediaan bergerak bersama, saling melengkapi, dan tidak menunda kebaikan untuk lingkungan kita sendiri," ujarnya.\n\nKegiatan diakhiri dengan makan bersama khas angkringan yang dimasak oleh pemudi RW 1, mempererat tali silaturahmi antar pemuda dan para sesepuh desa.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    views: 342,
    readTime: '3 Menit'
  },
  {
    id: 'news-2',
    title: 'Meraih Prestasi: Tim Voli TDM RW 1 Sabet Juara 2 Turnamen Antar Desa Tawangsari',
    date: '10 September 2026',
    author: 'Dimas Aji Prasetyo',
    category: 'Prestasi Olahraga',
    summary: 'Setelah pertarungan sengit lima set di babak final, tim bola voli putra Muda-Mudi Tri Dharma Manunggal berhasil membawa pulang trofi Juara 2 ke Desa Pojok.',
    content: 'TAWANGSARI — Prestasi membanggakan kembali diukir oleh kontingen olahraga Muda-Mudi Tri Dharma Manunggal RW 1 Desa Pojok. Dalam gelaran Turnamen Bola Voli Antar Karang Taruna se-Kecamatan Tawangsari 2026, tim TDM berhasil melaju hingga partai puncak.\n\nDukungan suporter warga RW 1 yang memadati arena memberikan suntikan motivasi luar biasa. Koordinator Olahraga, Dimas Aji, mengungkapkan rasa bangganya atas perjuangan seluruh atlet yang rutin berlatih setiap akhir pekan.\n\n"Ini bukti bahwa pembinaan minat dan bakat pemuda di tingkat RW mampu menghasilkan prestasi yang membanggakan nama Desa Pojok. Kami bertekad untuk terus menjaga konsistensi latihan dan mempersiapkan generasi penerus berikutnya."',
    thumbnailUrl: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=800&q=80',
    views: 489,
    readTime: '4 Menit'
  },
  {
    id: 'news-3',
    title: 'Inovasi Digital: Website Resmi TDM Diluncurkan Sebagai Pusat Informasi Pemuda',
    date: '01 Oktober 2026',
    author: 'Sekretariat TDM & OPRSN',
    category: 'Organisasi & Teknologi',
    summary: 'Tri Dharma Manunggal resmi merilis portal website modern yang mencakup direktori keanggotaan, transparansi keuangan kas, UMKM pemuda, dan sistem sertifikasi.',
    content: 'SUKOHARJO — Memasuki era digitalisasi, organisasi kepemudaan Muda-Mudi Tri Dharma Manunggal RW 1 Desa Pojok membuktikan kesiapannya dengan meluncurkan platform website resmi.\n\nWebsite ini dirancang secara khusus untuk memfasilitasi kebutuhan pemuda dan warga desa, mulai dari pengumuman agenda terkini, galeri dokumentasi foto dan video, pelaporan keuangan kas secara transparan, pendaftaran anggota baru secara online, hingga etalase digital bagi produk-produk UMKM rintisan anggota pemuda.\n\n"Kami ingin keterbukaan dan kredibilitas organisasi kami bisa diakses kapan pun oleh sesepuh desa, warga, maupun pemuda perantau yang ingin memantau perkembangan kampung halaman," tutur Fajar Kurniawan, Bendahara TDM.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    views: 615,
    readTime: '3 Menit'
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Gotong Royong Bersih Selokan & Jalan RW 1',
    category: 'Sosial',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
    caption: 'Semangat muda dan gotong royong warga RW 1 Desa Pojok saat membersihkan saluran lingkungan.',
    date: 'September 2026'
  },
  {
    id: 'gal-2',
    title: 'Turnamen Tenis Meja Semarak HUT RI',
    category: 'Olahraga',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=600&q=80',
    caption: 'Pertandingan sengit tenis meja antar RT di Balai RW 01 yang dipadati warga penonton.',
    date: 'Agustus 2026'
  },
  {
    id: 'gal-3',
    title: 'Pentas Seni & Malam Resepsi Kemerdekaan',
    category: 'Budaya',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
    caption: 'Panggung gembira persembahan pemuda Tri Dharma Manunggal untuk masyarakat RW 1.',
    date: 'Agustus 2026'
  },
  {
    id: 'gal-4',
    title: 'Latihan Rutin Bola Voli Sore Pemuda TDM',
    category: 'Olahraga',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=600&q=80',
    caption: 'Aktivitas rutin pemuda menjaga kebugaran dan kekompakan di lapangan voli RW 1.',
    date: 'September 2026'
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    title: 'Juara 2 Turnamen Bola Voli Karang Taruna',
    year: 2026,
    competition: 'Piala Camat Tawangsari Cup 2026',
    category: 'Olahraga',
    rank: 'Juara 2',
    description: 'Tim bola voli putra Tri Dharma Manunggal RW 1 Desa Pojok sukses mengalahkan 14 tim karang taruna se-Kecamatan Tawangsari hingga mencapai babak final.',
    imageUrl: 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ach-2',
    title: 'Organisasi Pemuda Paling Aktif & Guyub',
    year: 2025,
    competition: 'Apresiasi Karang Taruna Teladan Desa Pojok',
    category: 'Organisasi',
    rank: 'Terbaik 1',
    description: 'Penghargaan dari Pemerintah Desa Pojok atas konsistensi TDM RW 1 dalam kegiatan sosial kemasyarakatan, kebersihan lingkungan, dan ketertiban desa.',
    imageUrl: 'https://images.unsplash.com/photo-1569429593410-b498b3fb3387?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ach-3',
    title: 'Juara 1 Lomba Gapura Hias Kemerdekaan RI',
    year: 2025,
    competition: 'Festival Gapura Kemerdekaan Tingkat Kecamatan Tawangsari',
    category: 'Seni & Budaya',
    rank: 'Juara 1',
    description: 'Kreasi gapura bambu tematik dan lampu hias karya pemuda RW 1 Desa Pojok dinobatkan sebagai gapura terindah dan terkreatif.',
    imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80'
  }
];

export const INITIAL_UMKM: UMKMProduct[] = [
  {
    id: 'umkm-1',
    businessName: 'Kripik Tempe "Berkah Pojok"',
    ownerName: 'Siti Nur Aisyah',
    productName: 'Kripik Tempe Gurih & Renyah (250gr)',
    price: 15000,
    priceFormatted: 'Rp 15.000',
    category: 'Makanan & Camilan',
    description: 'Kripik tempe kedelai murni resep warisan keluarga di RW 1 Pojok. Digoreng dengan minyak kelapa higienis tanpa bahan pengawet.',
    imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80',
    whatsappNumber: '6285747263684',
    instagram: 'kripik_berkahpojok',
    rating: 4.9
  },
  {
    id: 'umkm-2',
    businessName: 'Angkringan Pemuda "Seduluran"',
    ownerName: 'Bagas Aditya & Mas Yudi',
    productName: 'Wedang Jahe Rempah & Nasi Kucing Spesial',
    price: 5000,
    priceFormatted: 'Mulai Rp 3.000 - Rp 10.000',
    category: 'Kuliner & Minuman',
    description: 'Tempat kumpul asyik pemuda dan warga tiap malam di pertigaan RW 1 Pojok. Menyediakan aneka sate puyuh, sate usus, dan kopi tubruk.',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
    whatsappNumber: '6285747263684',
    instagram: 'angkringan_seduluran',
    rating: 4.8
  },
  {
    id: 'umkm-3',
    businessName: 'Sablon & Konveksi "TDM Custom"',
    ownerName: 'Rizky Wahyu Pratama',
    productName: 'Kaos Komunitas, Jaket, & Sablon Plastisol',
    price: 65000,
    priceFormatted: 'Mulai Rp 65.000',
    category: 'Jasa & Konveksi',
    description: 'Melayani cetak kaos reuni, seragam sinoman, jersey voli karang taruna, dan merchandise komunitas dengan bahan combed 30s premium.',
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    whatsappNumber: '6285747263684',
    instagram: 'tdm_customscreen',
    rating: 5.0
  },
  {
    id: 'umkm-4',
    businessName: 'Pojok Clean Motor Wash',
    ownerName: 'Bayu Saputra',
    productName: 'Cuci Motor Salju & Semir Ban Mengkilap',
    price: 12000,
    priceFormatted: 'Rp 12.000',
    category: 'Jasa Otomotif',
    description: 'Jasa cuci motor detail berlokasi di dekat pos kamling RW 1 Pojok. Bersih, cepat, dan menggunakan shampoo busa salju ramah cat.',
    imageUrl: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=600&q=80',
    whatsappNumber: '6285747263684',
    instagram: 'pojokclean_wash',
    rating: 4.7
  }
];

export const INITIAL_PROGRAMS: ProgramKerja[] = [
  {
    id: 'prog-1',
    name: 'Bakti Sosial & Santunan Yatim Dhuafa Rutin',
    category: 'Sosial',
    description: 'Penggalangan donasi sembako dan santunan berkala untuk warga kurang mampu di lingkungan RW 1.',
    purpose: 'Meningkatkan kepedulian sosial pemuda dan meringankan beban sesama warga desa.',
    personInCharge: 'Ilham Syahputra (Div. Sosial)',
    schedule: 'Setiap Menjelang Hari Raya & Triwulan',
    status: 'Sedang Berjalan',
    progressPercentage: 75
  },
  {
    id: 'prog-2',
    name: 'Turnamen Olahraga & Pembinaan Minat Bakat',
    category: 'Olahraga',
    description: 'Penyelenggaraan turnamen voli, tenis meja, dan senam sehat bersama warga RW 1.',
    purpose: 'Mendorong gaya hidup sehat dan mempererat persaudaraan antar RT.',
    personInCharge: 'Dimas Aji Prasetyo (Div. Olahraga)',
    schedule: 'Setiap Akhir Pekan & Bulan Agustus',
    status: 'Sedang Berjalan',
    progressPercentage: 80
  },
  {
    id: 'prog-3',
    name: 'Bimbingan Belajar & Pelatihan Keterampilan Digital',
    category: 'Pendidikan',
    description: 'Kelas belajar gratis untuk adik-adik SD/SMP di balai RW dan pelatihan IT pemuda.',
    purpose: 'Mencerdaskan generasi penerus desa dan memperluas wawasan teknologi.',
    personInCharge: 'Anisa Ratna Dewi (Sekretaris)',
    schedule: '2 Kali Sebulan (Minggu Pagi)',
    status: 'Rencana',
    progressPercentage: 40
  },
  {
    id: 'prog-4',
    name: 'Pelestarian Seni Tradisi & Karawitan Pemuda',
    category: 'Seni & Budaya',
    description: 'Latihan gamelan dan tari kreasi pemuda untuk mengisi resepsi pernikahan dan hajatan desa.',
    purpose: 'Menjaga kelestarian warisan budaya Jawa di kalangan anak muda Sukoharjo.',
    personInCharge: 'Bagas Aditya (Wakil Ketua)',
    schedule: 'Malam Minggu Pekan ke-2 & 4',
    status: 'Sedang Berjalan',
    progressPercentage: 65
  },
  {
    id: 'prog-5',
    name: 'Kajian Pemuda & Tadarus Keliling',
    category: 'Keagamaan',
    description: 'Forum pengajian tematik bulanan di masjid/mushola wilayah RW 1 secara bergiliran.',
    purpose: 'Membina spiritualitas dan keteladanan akhlak pemuda pemudi muslim.',
    personInCharge: 'Ilham Syahputra',
    schedule: 'Malam Jumat Kliwon',
    status: 'Sedang Berjalan',
    progressPercentage: 90
  },
  {
    id: 'prog-6',
    name: 'Gerakan Bersih Sungai & Bank Sampah Mandiri',
    category: 'Lingkungan',
    description: 'Kerja bakti pembersihan saluran lingkungan dan pemilahan sampah anorganik bernilai jual.',
    purpose: 'Menciptakan lingkungan RW 1 yang asri, bebas jentik nyamuk, dan bernilai ekonomis.',
    personInCharge: 'Tri Wahyudi (Div. Lingkungan)',
    schedule: 'Setiap 2 Pekan Sekali (Minggu Pagi)',
    status: 'Sedang Berjalan',
    progressPercentage: 85
  },
  {
    id: 'prog-7',
    name: 'Pemberdayaan UMKM & Inkubasi Bisnis Pemuda',
    category: 'Kewirausahaan',
    description: 'Fasilitasi pemasaran produk rintisan anggota pemuda melalui portal website dan pameran bazar.',
    purpose: 'Menciptakan kemandirian ekonomi pemuda agar produktif di kampung halaman.',
    personInCharge: 'Siti Nur Aisyah (Div. Kewirausahaan)',
    schedule: 'Sepanjang Tahun',
    status: 'Sedang Berjalan',
    progressPercentage: 70
  }
];

export const INITIAL_FINANCES: FinancialRecord[] = [
  {
    id: 'fin-1',
    type: 'Pemasukan',
    category: 'Iuran Anggota',
    amount: 500000,
    date: '2026-10-01',
    description: 'Iuran rutin bulanan anggota TDM RW 1 periode Oktober 2026',
    receiptNote: 'Kuitansi No. TDM/01/X/2026'
  },
  {
    id: 'fin-2',
    type: 'Pengeluaran',
    category: 'Konsumsi',
    amount: 150000,
    date: '2026-10-02',
    description: 'Konsumsi snack rapat pengurus dan koordinasi kerja bakti',
    receiptNote: 'Struk Toko Pojok'
  }
];

export const INITIAL_TASKS: TaskItem[] = [
  {
    id: 'tsk-1',
    title: 'Persiapan Tempat & Notulensi Rapat Rutin Oktober',
    personInCharge: 'Anisa Ratna & Dinda',
    deadline: '2026-10-10',
    priority: 'Tinggi',
    status: 'Sedang Dikerjakan',
    category: 'Kesekretariatan'
  },
  {
    id: 'tsk-2',
    title: 'Pemasangan Lampu Sorot Lapangan Voli RW 1',
    personInCharge: 'Dimas Aji & Bayu',
    deadline: '2026-10-13',
    priority: 'Sedang',
    status: 'Belum Dimulai',
    category: 'Olahraga'
  },
  {
    id: 'tsk-3',
    title: 'Editing Video Reel Keseruan Kerja Bakti di IG @tdm_rw1',
    personInCharge: 'Rizky Wahyu (PDD)',
    deadline: '2026-10-08',
    priority: 'Sedang',
    status: 'Selesai',
    category: 'Media'
  },
  {
    id: 'tsk-4',
    title: 'Pendataan Calon Anggota Baru Pendaftar Online',
    personInCharge: 'Bagas Aditya (Wakil Ketua)',
    deadline: '2026-10-15',
    priority: 'Tinggi',
    status: 'Sedang Dikerjakan',
    category: 'Keanggotaan'
  }
];

export const INITIAL_PIKET: PiketSchedule[] = [
  {
    id: 'pkt-1',
    day: 'Senin',
    dateStr: '06 Oktober 2026',
    timeRange: '19:00 - 21:00 WIB',
    members: ['Surya Jati P', 'Dimas Aji', 'Tri Wahyudi'],
    tasks: 'Pembersihan balai sekretariat RW 1, pengecekan lampu jalan, penerimaan tamu pemuda.',
    status: 'Akan Datang'
  },
  {
    id: 'pkt-2',
    day: 'Rabu',
    dateStr: '08 Oktober 2026',
    timeRange: '19:00 - 21:00 WIB',
    members: ['Bagas Aditya', 'Rizky Wahyu', 'Bayu Saputra'],
    tasks: 'Penyiraman tanaman penghijauan balai, pengarsipan surat masuk, pengecekan inventaris alat olahraga.',
    status: 'Akan Datang'
  },
  {
    id: 'pkt-3',
    day: 'Jumat',
    dateStr: '10 Oktober 2026',
    timeRange: '18:30 - 21:30 WIB',
    members: ['Fajar Kurniawan', 'Anisa Ratna', 'Dinda Ayu', 'Rina Nur'],
    tasks: 'Persiapan ruang rapat bulanan, konsumsi, dan presensi kehadiran anggota.',
    status: 'Akan Datang'
  }
];

export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-1',
    code: 'TDM-2026-VOLI-01',
    recipientName: 'Dimas Aji Prasetyo',
    eventName: 'Turnamen Bola Voli Antar Karang Taruna Kecamatan Tawangsari 2026',
    role: 'Kapten Tim & Atlet Terbaik',
    issueDate: '10 September 2026',
    signatory: 'Surya Jati P',
    signatoryRole: 'Ketua Umum Muda-Mudi Tri Dharma Manunggal',
    verificationStatus: 'Terverifikasi'
  },
  {
    id: 'cert-2',
    code: 'TDM-2026-PANITIA-05',
    recipientName: 'Anisa Ratna Dewi',
    eventName: 'Pentas Seni & Malam Resepsi Kemerdekaan RI ke-81',
    role: 'Koordinator Acara & Protokoler',
    issueDate: '20 Agustus 2026',
    signatory: 'Surya Jati P',
    signatoryRole: 'Ketua Umum Muda-Mudi Tri Dharma Manunggal',
    verificationStatus: 'Terverifikasi'
  },
  {
    id: 'cert-3',
    code: 'TDM-2026-BAKSOS-12',
    recipientName: 'Ilham Syahputra',
    eventName: 'Bakti Sosial & Santunan Berkah Ramadan 1447 H / 2026 M',
    role: 'Ketua Panitia Pelaksana',
    issueDate: '30 Maret 2026',
    signatory: 'Surya Jati P',
    signatoryRole: 'Ketua Umum Muda-Mudi Tri Dharma Manunggal',
    verificationStatus: 'Terverifikasi'
  },
  {
    id: 'cert-4',
    code: 'TDM-2026-MEDIA-08',
    recipientName: 'Rizky Wahyu Pratama',
    eventName: 'Pelatihan Konten Kreator & Publikasi Digital Pemuda Desa',
    role: 'Pemateri & Koordinator PDD',
    issueDate: '15 Juli 2026',
    signatory: 'Surya Jati P',
    signatoryRole: 'Ketua Umum Muda-Mudi Tri Dharma Manunggal',
    verificationStatus: 'Terverifikasi'
  }
];

export const INITIAL_REGISTRATIONS: RegistrationSubmission[] = [
  {
    id: 'reg-1',
    fullName: 'Wahyu Hidayat',
    nickname: 'Wahyu',
    birthDate: '2005-06-14',
    gender: 'Laki-laki',
    whatsapp: '085712349900',
    instagram: 'wahyuhid_05',
    rtAddress: 'RT 02 / RW 01 Desa Pojok',
    interests: ['Olahraga', 'Kewirausahaan'],
    skills: 'Bermain bola voli, fotografi dasar',
    reasons: 'Ingin berpartisipasi aktif dalam memajukan pemuda RW 1 dan menambah relasi pertemanan.',
    submittedAt: '2026-10-02 14:20',
    status: 'Menunggu'
  },
  {
    id: 'reg-2',
    fullName: 'Novi Anggraini',
    nickname: 'Novi',
    birthDate: '2006-11-20',
    gender: 'Perempuan',
    whatsapp: '081399887766',
    instagram: 'novi.anggr',
    rtAddress: 'RT 01 / RW 01 Desa Pojok',
    interests: ['Seni & Budaya', 'Pendidikan'],
    skills: 'Menari tradisional Jawa, mengajar anak-anak',
    reasons: 'Mau menyumbangkan keterampilan menari untuk pentas kemerdekaan dan acara desa.',
    submittedAt: '2026-10-01 09:15',
    status: 'Diterima'
  }
];

// USER ACCOUNTS - Semua kata sandi admin diseragamkan ke UNIFIED_ADMIN_PASSWORD ("tridharma2026")
export const DEFAULT_ADMIN_USERS: AdminUser[] = [
  {
    id: 'usr-1',
    name: 'Surya Jati P',
    role: 'Super Admin',
    username: 'superadmin',
    password: UNIFIED_ADMIN_PASSWORD,
    email: 'tridharmamanunggalrw1@gmail.com',
    phone: '+62 857-4726-3684',
    rtAddress: 'RT 01 / RW 01 Desa Pojok',
    status: 'Aktif',
    createdAt: '2026-01-01',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'usr-2',
    name: 'Bagas Aditya Nugroho',
    role: 'Admin',
    username: 'admin',
    password: UNIFIED_ADMIN_PASSWORD,
    email: 'admin.tdm@gmail.com',
    phone: '+62 812-3456-7890',
    rtAddress: 'RT 02 / RW 01 Desa Pojok',
    status: 'Aktif',
    createdAt: '2026-01-05',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'usr-3',
    name: 'Fajar Kurniawan S.E.',
    role: 'Bendahara',
    username: 'bendahara',
    password: UNIFIED_ADMIN_PASSWORD,
    email: 'bendahara.tdm@gmail.com',
    phone: '+62 821-9876-5432',
    rtAddress: 'RT 03 / RW 01 Desa Pojok',
    status: 'Aktif',
    createdAt: '2026-01-10',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'usr-4',
    name: 'Anisa Ratna Dewi',
    role: 'Sekretaris',
    username: 'sekretaris',
    password: UNIFIED_ADMIN_PASSWORD,
    email: 'sekretaris.tdm@gmail.com',
    phone: '+62 856-7890-1234',
    rtAddress: 'RT 04 / RW 01 Desa Pojok',
    status: 'Aktif',
    createdAt: '2026-01-12',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'usr-5',
    name: 'Rizky Wahyu Pratama',
    role: 'PDD',
    username: 'pdd',
    password: UNIFIED_ADMIN_PASSWORD,
    email: 'pdd.tdm@gmail.com',
    phone: '+62 896-1234-9988',
    rtAddress: 'RT 01 / RW 01 Desa Pojok',
    status: 'Aktif',
    createdAt: '2026-02-01',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'usr-6',
    name: 'Warga / Anggota Muda RW 1',
    role: 'Viewer',
    username: 'warga',
    password: UNIFIED_ADMIN_PASSWORD,
    email: 'warga.rw1@desa-pojok.id',
    phone: '+62 852-0000-1111',
    rtAddress: 'RT 01 / RW 01 Desa Pojok',
    status: 'Aktif',
    createdAt: '2026-03-01',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
  }
];

export const DEFAULT_APPEARANCE_CONFIG: SiteAppearanceConfig = {
  primaryTheme: 'blue',
  heroHeadline: 'Solidaritas Muda Berkarya, Berbakti Nyata untuk Desa',
  heroSubheadline: 'Wadah persatuan, kreativitas, dan kepedulian sosial generasi muda RW 01 Desa Pojok, Kecamatan Tawangsari, Kabupaten Sukoharjo.',
  mottoQuote: 'Ra mangan ra jalan',
  heroBadge: 'Paguyuban Pemuda RW 01 Desa Pojok',
  heroBackgroundImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1800&q=80',
  showMarquee: true,
  showTriDharmaPillars: true,
  showActivitiesPreview: true,
  showAgendaPreview: true,
  showTransparencyPreview: true,
  showUMKMPreview: true,
  showAchievementsPreview: true,
  footerTagline: 'Muda, Berkarya, Bersatu Membangun Desa Pojok yang Guyub Rukun.'
};

export const DEFAULT_SECURITY_SETTINGS: SecuritySettings = {
  maxLoginAttempts: 5,
  lockoutMinutes: 15,
  requirePasskeyForDeletion: true,
  masterAdminPassword: UNIFIED_ADMIN_PASSWORD,
  sessionTimeoutMinutes: 60,
  antiXssEnabled: true,
  rateLimitingEnabled: true,
  secureHeadersSimulated: true
};

export const DEFAULT_GMAIL_SYNC: GmailSyncInfo = {
  connectedEmail: 'tridharmamanunggalrw1@gmail.com',
  lastBackupDate: '2026-10-04 10:15 WIB',
  backupStatus: 'Tersambung',
  totalSnapshots: 3,
  lastSnapshotSize: '128 KB'
};

export const INITIAL_SECURITY_LOGS: SecurityLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-10-04 08:30:12',
    event: 'Autentikasi Pengurus Berhasil',
    user: 'superadmin (Surya Jati P)',
    ipAddress: '192.168.1.1 (Internal Gateway)',
    severity: 'info',
    details: 'Login sesi terverifikasi menggunakan sandi resmi seragam.'
  },
  {
    id: 'log-2',
    timestamp: '2026-10-04 07:15:40',
    event: 'Pencadangan Database ke Gmail Berhasil',
    user: 'Sistem Sinkronisasi Gmail',
    ipAddress: 'Server Internal',
    severity: 'info',
    details: 'Snapshot terenkripsi berhasil dicadangkan ke tridharmamanunggalrw1@gmail.com.'
  },
  {
    id: 'log-3',
    timestamp: '2026-10-03 21:10:05',
    event: 'Audit Keamanan Website & Proteksi XSS Aktif',
    user: 'Security Guard System',
    ipAddress: '127.0.0.1',
    severity: 'info',
    details: 'Semua filter sanitasi input dan proteksi brute force berjalan optimal.'
  }
];
