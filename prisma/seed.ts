import "dotenv/config";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";

const SERVICES = [
  {
    title: "Pendidikan Kelompok Bermain",
    description:
      "Membentuk karakter Islami sejak dini dengan metode pembelajaran yang menyenangkan dan interaktif.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA4yoPRmbCkKBQYGeOj2WEfw00j2Gckw7gLIuqzKpnPDre8j81j_ZPjUFuz7_0BEUSwAco5ccP36Ih9NVo_coqHQi3upaMRyN4-UIdh7ZgMaaUSfZqn_fXlfL9Cwe3kUVuUb3VUGAVk90RpdTW9NZN7wtK67hpXdTxhc6-eBIjwLJmgG3xJDemwdhFI6bowL2eAiUII9kNiNUZ05P7txr1OsUTRIS3SeNhYPki8tiH70S0GsTCVurA2",
    order: 0,
  },
  {
    title: "Sekolah Dasar (SD)",
    description:
      "Pendidikan dasar yang mengintegrasikan kurikulum nasional dengan pemahaman agama yang mendalam.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDS4IkFA13Hzy3dQyetIGJhRu3GRtNnNK40emx2Ndiq9oQLDLDnvGlkpUkwUkt1Y2E78v9vAJvPNVFC9dtT8RQyLOGDZdr0-gp0h0OaCmWXsEFBzdLm74ndBFxVl9BLAhTmj5o97v2tEXE5NZ0EKrp16RF9r-RXdiijsenhUs_J68W7kEBo4qWAQLdshz6WqcUO-Ha-2SUq_7QXmPocO4NdU2DEGks3SmLCQlaRGSMl5sfSLgiLPHsi",
    order: 1,
  },
  {
    title: "Sekolah Menengah Pertama (SMP)",
    description:
      "Mempersiapkan remaja dengan bekal ilmu pengetahuan umum dan adab yang berlandaskan Al-Qur'an dan Sunnah.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCLrNy4Fq3Ktomo_63W03jq2bYUY7ifniJSmUGA8eo9yX62etBxxk6O1VnHgiWl5b4UEqg-J7_wiZ8jy6vdTMhcQ6GLlNP13cIiFCUPb8qvHKDRjazO55lwWIs7ZlPBd_VuXrxrfczq7gdognGdY7eKPJDz0p4t7p1D-ZRCG7s_wLsANSNulDN_YnxuO07aqrP0FJt6UuIlaVmOTFvmFN56nJbNBHOJvk6rYBglj2agwHTo4R0BYZG9",
    order: 2,
  },
  {
    title: "Sekolah Menengah Atas (SMA)",
    description:
      "Pendidikan tingkat lanjut yang berfokus pada keunggulan akademik, kepemimpinan, dan kesiapan masuk perguruan tinggi.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAalj1gaK7qCL48KTAR6K_ORYqmZWFr3Zx_uAvAzaF_qPurKG1hKFls48VloIUkeOJOAcj_krhCRM7geYgnbtoiHKGB7kFCelb65UydnoABYNfznTCSvsHFR1pUI6STDpFd1ZQ4TVcI0vqCFXoVzs8XCgKtYL15z_jXY0r0qni1kYlfG1GOmwFohc5VolCfeyZRmVG1XkLF7VbiTKz-pKmPgTWiMu4CqUlshUq-vnQoLQBbB5rhZ3P6",
    order: 3,
  },
  {
    title: "Penelitian & Pengembangan (Electricity)",
    description:
      "Inovasi teknologi dan penelitian berkelanjutan dalam bidang kelistrikan untuk kemaslahatan umat.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDoeBYa0k9XGxebHYCu_wqORu9JuKDtkiq0V1pTuV0W7z-nRa6vdiEZhQYGGxQ8mXP3DxBluJ3ysTFAybERVQwELgOCxPY2aE8qTUyV5a_ay7ZU327yRiTTjKRwcefaVs8u4-y9Qe4fdoG2Os39Sus6lXlskkBaB_PiMBfdoGLthztlzZd9BjClxp4WdsuVwZIGhXVoUqb7o1jduBLvKrMZiSmcKhykMKdvgH3tPSwhhIpYgkPxM9aZ",
    order: 4,
  },
  {
    title: "Penyediaan Jasa Boga",
    description:
      "Layanan katering profesional yang terjamin kehalalan, kebersihan, dan cita rasanya untuk berbagai kebutuhan.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDkiarBki8qxi60E1XuszdfKUDhMZi4FTplTrbKRjAL78kwWLFu7DHBII5sriTrOfLTir5lE-wTthH5e7ULBHD5fk1mlk74u_VADGJqJvDID77pvhTrdmJMQMkQIc8NGgpqArWuPioWGaBtZhS_lxePNezlS0W_rxMHnO1yDXCWqLxwCdNwJ59zFdzAgMb_4uNTCGo1BKxpRNAgigYdpyVWdxP7sgV8pcPMUeixz0laq-wpmVYpEJHd",
    order: 5,
  },
];

const LEADERSHIP = [
  { name: "Priyo Iswanto", role: "Ketua Pembina", group: "Pembina", imageUrl: "/img/leadership/priyo.jpg", order: 0 },
  { name: "Abdul Razaq Ananda Azwi", role: "Ketua Pengawas", group: "Pengawas", imageUrl: "/img/leadership/razaq.jpg", order: 1 },
  { name: "Hari Mulyono", role: "Ketua", group: "Pengurus Harian", imageUrl: "/img/leadership/hari.jpeg", order: 2 },
  { name: "Ir. Muhammad Azhari, SH, MH", role: "Sekretaris", group: "Pengurus Harian", imageUrl: "/img/leadership/azhari.jpg", order: 3 },
  { name: "Annisa Rahima Ananda Azwi", role: "Bendahara", group: "Pengurus Harian", imageUrl: "/img/leadership/anissa.jpeg", order: 4 },
];

const CONTACT_INFO = [
  {
    icon: "location_on",
    label: "ALAMAT KANTOR",
    value: "Jl. Sejahtera No. 21\nMedan, Sumatera Utara",
    order: 0,
  },
  {
    icon: "mail",
    label: "EMAIL",
    value: "info@yayasputraprabu.or.id",
    order: 1,
  },
  {
    icon: "call",
    label: "TELEPON",
    value: "+62 61 1234 5678",
    order: 2,
  },
];

async function seedServices() {
  const count = await prisma.service.count();
  if (count > 0) {
    console.log(`- Service: sudah ada ${count} data, dilewati.`);
    return;
  }
  await prisma.service.createMany({ data: SERVICES });
  console.log(`- Service: ${SERVICES.length} data ditambahkan.`);
}

async function seedLeadership() {
  const count = await prisma.leader.count();
  if (count > 0) {
    console.log(`- Leader: sudah ada ${count} data, dilewati.`);
    return;
  }
  await prisma.leader.createMany({ data: LEADERSHIP });
  console.log(`- Leader: ${LEADERSHIP.length} data ditambahkan.`);
}

async function seedContactInfo() {
  const count = await prisma.contactInfo.count();
  if (count > 0) {
    console.log(`- ContactInfo: sudah ada ${count} data, dilewati.`);
    return;
  }
  await prisma.contactInfo.createMany({ data: CONTACT_INFO });
  console.log(`- ContactInfo: ${CONTACT_INFO.length} data ditambahkan.`);
}

async function seedAdmin() {
  const existing = await prisma.admin.count();
  if (existing > 0) {
    console.log(`- Admin: sudah ada ${existing} akun, dilewati.`);
    return;
  }

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error(
      "ADMIN_EMAIL dan ADMIN_PASSWORD harus diisi di .env sebelum menjalankan seed."
    );
  }

  const { hash, salt } = await hashPassword(password);
  await prisma.admin.create({
    data: { email, passwordHash: hash, passwordSalt: salt },
  });
  console.log(`- Admin: akun ${email} dibuat.`);
}

async function main() {
  console.log("Seeding database...");
  await seedServices();
  await seedLeadership();
  await seedContactInfo();
  await seedAdmin();
  console.log("Selesai.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
