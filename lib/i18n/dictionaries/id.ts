const dict = {
  meta: {
    title: "Yayasan Putra Prabu Indonesia Raya",
    description: "Website resmi Yayasan Putra Prabu Indonesia Raya",
  },
  common: {
    nav: {
      home: "Beranda",
      about: "Tentang Kami",
      news: "Berita",
      contact: "Kontak Kami",
    },
    openMenu: "Buka menu",
    closeMenu: "Tutup menu",
    readMore: "Baca Selengkapnya",
    viewAll: "Lihat Semua",
  },
  footer: {
    tagline:
      "Membangun peradaban melalui pendidikan, teknologi, dan integritas Islami. Membentuk generasi cerdas dan berakhlak mulia.",
    linksHeading: "Tautan",
    links: {
      home: "Beranda",
      about: "Tentang Kami",
      news: "Berita & Artikel",
      contact: "Kontak Kami",
    },
    addressHeading: "Alamat & Legal",
    privacyPolicy: "Kebijakan Privasi",
    terms: "Syarat & Ketentuan",
    copyright: "© 2024 Yayasan Putra Prabu Indonesia Raya. Hak cipta dilindungi.",
  },
  home: {
    hero: {
      title: "Membangun Generasi Unggul Berlandaskan Nilai Islam",
      description:
        "Yayasan Putra Prabu Indonesia Raya berkomitmen untuk menyediakan pendidikan berkualitas, inovasi teknologi, dan layanan masyarakat yang berintegritas tinggi.",
      ctaPrimary: "Jelajahi Program",
      ctaSecondary: "Tentang Kami",
    },
    services: {
      heading: "Bidang Kegiatan Kami",
      intro:
        "Yayasan Putra Prabu Indonesia Raya berikhtiar di berbagai bidang krusial untuk pemberdayaan umat dan kemajuan bangsa.",
      cards: {
        education: {
          tag: "Pendidikan Terpadu",
          title: "KB, SD, SMP, SMA",
          description:
            "Sistem pendidikan menyeluruh yang menggabungkan keunggulan akademik dengan pembentukan karakter Islami yang kuat.",
        },
        research: {
          title: "Riset & Teknologi",
          description: "Inovasi kelistrikan dan rekayasa untuk masa depan.",
        },
        catering: {
          title: "Boga & Kepedulian Umat",
          description:
            "Penyediaan makanan halal berkualitas sebagai wujud kepedulian kepada umat.",
        },
      },
    },
    latestNews: {
      heading: "Berita Terkini",
      viewAll: "Lihat Semua",
    },
  },
  about: {
    hero: {
      title: "Membangun Masa Depan Umat",
      description:
        "Berdedikasi dalam pendidikan, penelitian, dan pelayanan masyarakat dengan landasan nilai-nilai Islam yang kokoh dan integritas yang tinggi.",
    },
    services: {
      heading: "Bidang Kegiatan Yayasan",
      intro:
        "Berikhtiar menyelenggarakan pendidikan berkualitas dan pemberdayaan umat melalui berbagai bidang kegiatan.",
    },
    leadership: {
      heading: "Pimpinan Yayasan",
      intro:
        "Sosok yang memimpin dan mengarahkan Yayasan Putra Prabu Indonesia Raya dengan amanah dan profesionalisme.",
      boardPrefix: "Dewan",
      welcomeLabel: "Kata Sambutan",
      welcomeMessage:
        "Assalamu'alaikum warahmatullahi wabarakatuh. Puji syukur kami panjatkan kehadirat Allah SWT atas segala rahmat dan karunia-Nya, sehingga Yayasan Putra Prabu Indonesia Raya dapat terus berikhtiar menghadirkan pendidikan yang berkualitas dan pelayanan umat yang amanah. Atas nama seluruh keluarga besar yayasan, kami mengucapkan terima kasih atas kepercayaan dan dukungan yang telah diberikan. Mari bersama-sama kita bangun generasi yang unggul dalam ilmu pengetahuan dan akhlak mulia. Semoga Allah SWT senantiasa membimbing langkah kita. Aamiin.",
    },
    pimpinanPonpes: {
      heading: "Pondok Pesantren Terafiliasi",
      intro:
        "Dayah Darul Munawwarah Kuta Krueng, pondok pesantren afiliasi Yayasan Putra Prabu Indonesia Raya yang telah membina santri dan mengawal syiar dakwah sejak tahun 1966.",
      ponpes: {
        name: "Dayah Darul Munawwarah",
        location: "Kuta Krueng, Pidie Jaya",
        history:
          "Didirikan pada tahun 1966 oleh almarhum Tgk. H. Usman Ali, yang lebih dikenal sebagai Abu Kuta Krueng, Dayah Darul Munawwarah telah menjadi pusat pendidikan dan dakwah Islam bagi masyarakat Pidie Jaya dan sekitarnya selama lebih dari setengah abad.",
        addressLabel: "Alamat",
        address:
          "Jln. Abu Kuta Krueng, Desa Kuta Krueng, Kecamatan Banda Dua, Pidie Jaya",
        facilitiesLabel: "Fasilitas",
        facilities: [
          "Masjid/Musala",
          "Asrama",
          "Ruang Kelas",
          "Kantor",
          "Perpustakaan",
          "Kantin/Ruang Makan",
          "UKS (Unit Kesehatan Santri)",
          "Aula/Ruang Serbaguna",
          "Sarana Olahraga",
          "Koperasi",
          "Laboratorium",
          "Akses Internet",
        ] as string[],
        locationButton: "Lihat Lokasi",
      },
      peopleHeading: "Pimpinan Pondok Pesantren",
      people: [
        { name: "Abu Kuta Krueng", role: "Pimpinan Pondok Pesantren (Alm.)" },
        { name: "Teuku Anwar Kuta Krueng", role: "Pimpinan Pondok Pesantren" },
      ] as { name: string; role: string }[],
    },
    visiMisi: {
      heading: "Visi & Misi",
      intro:
        "Landasan cita-cita dan langkah nyata Yayasan Putra Prabu Indonesia Raya dalam membangun umat.",
      visiLabel: "Visi",
      visiText:
        "Menjadi yayasan terkemuka yang melahirkan generasi cerdas, berakhlak mulia, dan bermanfaat bagi umat serta bangsa melalui pendidikan, riset, dan pelayanan masyarakat yang berlandaskan nilai-nilai keislaman.",
      misiLabel: "Misi",
      misiPoints: [
        "Menyelenggarakan pendidikan berkualitas berlandaskan nilai-nilai keislaman",
        "Membentuk karakter dan akhlak mulia peserta didik sejak usia dini",
        "Mengembangkan riset dan inovasi teknologi yang bermanfaat bagi umat",
        "Menyediakan pelayanan sosial dan kepedulian umat yang amanah dan berkelanjutan",
      ] as string[],
    },
  },
  contact: {
    hero: {
      title: "Hubungi Kami",
      description:
        "Kami siap mendengarkan dan menjalin silaturahmi. Silakan hubungi kami melalui formulir di bawah ini atau kunjungi kantor kami.",
    },
    mapTitle: "Lokasi Yayasan Putra Prabu Indonesia Raya",
    form: {
      heading: "Kirim Pesan",
      labels: {
        name: "Nama Lengkap",
        email: "Alamat Email",
        subject: "Subjek",
        message: "Pesan",
      },
      placeholders: {
        name: "Masukkan nama Anda",
        email: "email@contoh.com",
        subject: "Tujuan pesan Anda",
        message: "Tuliskan pesan Anda di sini...",
      },
      submit: "Kirim Pesan Sekarang",
      submitting: "Mengirim...",
      success: "Pesan Anda berhasil dikirim. Kami akan segera menghubungi Anda.",
      errorGeneric: "Terjadi kesalahan. Silakan coba lagi nanti.",
      errorRateLimited: "Terlalu banyak permintaan. Silakan coba lagi nanti.",
      errorMissingFields: "Nama, Email, dan Pesan wajib diisi.",
    },
    info: {
      heading: "Informasi Kontak",
      missionHeading: "Misi Kami",
      missionText:
        "Membangun generasi cerdas dan berakhlak mulia melalui pendidikan yang berlandaskan nilai-nilai integritas dan warisan luhur.",
      missionPoints: [
        "Pendidikan berkualitas berlandaskan nilai-nilai keislaman",
        "Membentuk karakter dan akhlak mulia sejak dini",
        "Berkontribusi bagi masa depan Indonesia yang bermartabat",
      ] as string[],
    },
  },
  news: {
    heading: "Berita & Artikel",
    intro:
      "Menyajikan informasi terkini mengenai kegiatan yayasan, perkembangan pendidikan Islam, kesejahteraan umat, serta inovasi teknologi yang selaras dengan nilai-nilai luhur.",
    readMore: "Baca Selengkapnya",
    empty: "Belum ada berita yang dipublikasikan.",
    related: "Berita Terkait",
    share: "Bagikan Artikel Ini:",
    pagination: {
      prev: "Halaman sebelumnya",
      next: "Halaman berikutnya",
    },
  },
  leadershipGroups: {
    pembina: "Pembina",
    pengawas: "Pengawas",
    pengurus_harian: "Pengurus Harian",
  },
  languageSwitcher: {
    label: "Bahasa",
  },
  admin: {
    login: {
      title: "Admin Login",
      subtitle: "Yayasan Putra Prabu Indonesia Raya",
      email: "Email",
      password: "Password",
      submit: "Masuk",
      submitting: "Memproses...",
      errorRequired: "Email dan password wajib diisi.",
      errorInvalid: "Email atau password salah.",
    },
    sidebar: {
      panelTitle: "Admin Panel",
      dashboard: "Dashboard",
      news: "Berita",
      services: "Layanan",
      leadership: "Kepengurusan",
      contact: "Info Kontak",
      logout: "Keluar",
      language: "Bahasa Admin",
    },
    dashboard: {
      title: "Dashboard",
    },
    common: {
      save: "Simpan",
      saving: "Menyimpan...",
      cancel: "Batal",
      edit: "Edit",
      delete: "Hapus",
      deleting: "Menghapus...",
      actions: "Aksi",
      order: "Urutan",
      image: "Gambar",
      currentImage: "Gambar saat ini",
      keepImageHint: "Kosongkan jika tidak ingin mengganti gambar.",
      confirmDelete: "Yakin ingin menghapus data ini?",
      tabId: "Indonesia",
      tabEn: "Inggris",
      tabAr: "Arab",
    },
    news: {
      title: "Berita",
      add: "+ Tambah Berita",
      addTitle: "Tambah Berita",
      editTitle: "Edit Berita",
      empty: "Belum ada berita.",
      columns: { image: "Gambar", title: "Judul", category: "Kategori", date: "Tanggal" },
      fields: {
        title: "Judul",
        category: "Kategori",
        date: "Tanggal",
        image: "Gambar",
        summary: "Ringkasan",
        content: "Konten Lengkap (opsional)",
      },
      errorRequired:
        "Judul, ringkasan, dan kategori (Bahasa Indonesia) serta tanggal wajib diisi.",
      errorImage: "Gambar wajib diunggah.",
    },
    services: {
      title: "Layanan",
      add: "+ Tambah Layanan",
      addTitle: "Tambah Layanan",
      editTitle: "Edit Layanan",
      empty: "Belum ada layanan.",
      columns: { image: "Gambar", title: "Judul", order: "Urutan" },
      fields: {
        title: "Judul",
        image: "Gambar",
        description: "Deskripsi",
        icon: "Ikon (material symbol, opsional)",
        order: "Urutan",
      },
      errorRequired: "Judul dan deskripsi (Bahasa Indonesia) wajib diisi.",
      errorImage: "Gambar wajib diunggah.",
    },
    leadership: {
      title: "Kepengurusan",
      add: "+ Tambah Pengurus",
      addTitle: "Tambah Pengurus",
      editTitle: "Edit Pengurus",
      empty: "Belum ada data pengurus.",
      columns: { name: "Nama", role: "Jabatan", group: "Kelompok", order: "Urutan" },
      fields: { name: "Nama", role: "Jabatan", group: "Kelompok", image: "Foto", order: "Urutan" },
      errorRequired: "Nama dan jabatan (Bahasa Indonesia) wajib diisi.",
      errorGroup: "Kelompok tidak valid.",
      errorImage: "Gambar wajib diunggah.",
    },
    contact: {
      title: "Info Kontak",
      add: "+ Tambah Info",
      addTitle: "Tambah Info Kontak",
      editTitle: "Edit Info Kontak",
      empty: "Belum ada info kontak.",
      columns: { icon: "Ikon", label: "Label", value: "Nilai", order: "Urutan" },
      fields: {
        icon: "Ikon (material symbol)",
        label: "Label",
        value: "Nilai",
        order: "Urutan",
      },
      errorRequired: "Ikon, label (Bahasa Indonesia), dan nilai wajib diisi.",
    },
  },
};

export default dict;
