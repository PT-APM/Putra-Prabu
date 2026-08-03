import "dotenv/config";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";

const SERVICES = [
  {
    titleId: "Pendidikan Kelompok Bermain",
    titleEn: "Playgroup Education",
    titleAr: "تعليم الروضة",
    descriptionId:
      "Membentuk karakter Islami sejak dini dengan metode pembelajaran yang menyenangkan dan interaktif.",
    descriptionEn:
      "Shaping Islamic character from an early age through fun and interactive learning methods.",
    descriptionAr:
      "تكوين الشخصية الإسلامية منذ الصغر من خلال أساليب تعلّم ممتعة وتفاعلية.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA4yoPRmbCkKBQYGeOj2WEfw00j2Gckw7gLIuqzKpnPDre8j81j_ZPjUFuz7_0BEUSwAco5ccP36Ih9NVo_coqHQi3upaMRyN4-UIdh7ZgMaaUSfZqn_fXlfL9Cwe3kUVuUb3VUGAVk90RpdTW9NZN7wtK67hpXdTxhc6-eBIjwLJmgG3xJDemwdhFI6bowL2eAiUII9kNiNUZ05P7txr1OsUTRIS3SeNhYPki8tiH70S0GsTCVurA2",
    order: 0,
  },
  {
    titleId: "Sekolah Dasar (SD)",
    titleEn: "Elementary School",
    titleAr: "المدرسة الابتدائية",
    descriptionId:
      "Pendidikan dasar yang mengintegrasikan kurikulum nasional dengan pemahaman agama yang mendalam.",
    descriptionEn:
      "Basic education that integrates the national curriculum with a deep understanding of religion.",
    descriptionAr: "تعليم أساسي يدمج المنهج الوطني مع فهم ديني عميق.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDS4IkFA13Hzy3dQyetIGJhRu3GRtNnNK40emx2Ndiq9oQLDLDnvGlkpUkwUkt1Y2E78v9vAJvPNVFC9dtT8RQyLOGDZdr0-gp0h0OaCmWXsEFBzdLm74ndBFxVl9BLAhTmj5o97v2tEXE5NZ0EKrp16RF9r-RXdiijsenhUs_J68W7kEBo4qWAQLdshz6WqcUO-Ha-2SUq_7QXmPocO4NdU2DEGks3SmLCQlaRGSMl5sfSLgiLPHsi",
    order: 1,
  },
  {
    titleId: "Sekolah Menengah Pertama (SMP)",
    titleEn: "Junior High School",
    titleAr: "المدرسة المتوسطة",
    descriptionId:
      "Mempersiapkan remaja dengan bekal ilmu pengetahuan umum dan adab yang berlandaskan Al-Qur'an dan Sunnah.",
    descriptionEn:
      "Preparing teenagers with general knowledge and manners grounded in the Qur'an and Sunnah.",
    descriptionAr:
      "إعداد المراهقين بالمعرفة العامة والأدب القائم على القرآن والسنة.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCLrNy4Fq3Ktomo_63W03jq2bYUY7ifniJSmUGA8eo9yX62etBxxk6O1VnHgiWl5b4UEqg-J7_wiZ8jy6vdTMhcQ6GLlNP13cIiFCUPb8qvHKDRjazO55lwWIs7ZlPBd_VuXrxrfczq7gdognGdY7eKPJDz0p4t7p1D-ZRCG7s_wLsANSNulDN_YnxuO07aqrP0FJt6UuIlaVmOTFvmFN56nJbNBHOJvk6rYBglj2agwHTo4R0BYZG9",
    order: 2,
  },
  {
    titleId: "Sekolah Menengah Atas (SMA)",
    titleEn: "Senior High School",
    titleAr: "المدرسة الثانوية",
    descriptionId:
      "Pendidikan tingkat lanjut yang berfokus pada keunggulan akademik, kepemimpinan, dan kesiapan masuk perguruan tinggi.",
    descriptionEn:
      "Advanced education focused on academic excellence, leadership, and college readiness.",
    descriptionAr:
      "تعليم متقدم يركز على التميز الأكاديمي والقيادة والاستعداد للجامعة.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAalj1gaK7qCL48KTAR6K_ORYqmZWFr3Zx_uAvAzaF_qPurKG1hKFls48VloIUkeOJOAcj_krhCRM7geYgnbtoiHKGB7kFCelb65UydnoABYNfznTCSvsHFR1pUI6STDpFd1ZQ4TVcI0vqCFXoVzs8XCgKtYL15z_jXY0r0qni1kYlfG1GOmwFohc5VolCfeyZRmVG1XkLF7VbiTKz-pKmPgTWiMu4CqUlshUq-vnQoLQBbB5rhZ3P6",
    order: 3,
  },
  {
    titleId: "Penelitian & Pengembangan (Electricity)",
    titleEn: "Research & Development (Electricity)",
    titleAr: "البحث والتطوير (الكهرباء)",
    descriptionId:
      "Inovasi teknologi dan penelitian berkelanjutan dalam bidang kelistrikan untuk kemaslahatan umat.",
    descriptionEn:
      "Technological innovation and ongoing research in the field of electricity for the benefit of the community.",
    descriptionAr:
      "ابتكار تكنولوجي وبحث مستمر في مجال الكهرباء لمصلحة المجتمع.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDoeBYa0k9XGxebHYCu_wqORu9JuKDtkiq0V1pTuV0W7z-nRa6vdiEZhQYGGxQ8mXP3DxBluJ3ysTFAybERVQwELgOCxPY2aE8qTUyV5a_ay7ZU327yRiTTjKRwcefaVs8u4-y9Qe4fdoG2Os39Sus6lXlskkBaB_PiMBfdoGLthztlzZd9BjClxp4WdsuVwZIGhXVoUqb7o1jduBLvKrMZiSmcKhykMKdvgH3tPSwhhIpYgkPxM9aZ",
    order: 4,
  },
  {
    titleId: "Penyediaan Jasa Boga",
    titleEn: "Catering Services",
    titleAr: "خدمات التموين",
    descriptionId:
      "Layanan katering profesional yang terjamin kehalalan, kebersihan, dan cita rasanya untuk berbagai kebutuhan.",
    descriptionEn:
      "Professional catering services guaranteed to be halal, clean, and delicious for various needs.",
    descriptionAr:
      "خدمات تموين احترافية مضمونة الحلال والنظافة والمذاق لمختلف الاحتياجات.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDkiarBki8qxi60E1XuszdfKUDhMZi4FTplTrbKRjAL78kwWLFu7DHBII5sriTrOfLTir5lE-wTthH5e7ULBHD5fk1mlk74u_VADGJqJvDID77pvhTrdmJMQMkQIc8NGgpqArWuPioWGaBtZhS_lxePNezlS0W_rxMHnO1yDXCWqLxwCdNwJ59zFdzAgMb_4uNTCGo1BKxpRNAgigYdpyVWdxP7sgV8pcPMUeixz0laq-wpmVYpEJHd",
    order: 5,
  },
];

const LEADERSHIP = [
  {
    name: "Priyo Iswanto",
    roleId: "Ketua Pembina",
    roleEn: "Chairman of the Board of Trustees",
    roleAr: "رئيس مجلس الأمناء",
    group: "pembina",
    imageUrl: "/img/leadership/priyo.jpg",
    order: 0,
  },
  {
    name: "Abdul Razaq Ananda Azwi",
    roleId: "Ketua Pengawas",
    roleEn: "Chairman of the Board of Supervisors",
    roleAr: "رئيس مجلس الرقابة",
    group: "pengawas",
    imageUrl: "/img/leadership/razaq.jpg",
    order: 1,
  },
  {
    name: "Hari Mulyono",
    roleId: "Ketua",
    roleEn: "Chairman",
    roleAr: "الرئيس",
    group: "pengurus_harian",
    imageUrl: "/img/leadership/hari.jpeg",
    order: 2,
  },
  {
    name: "Ir. Muhammad Azhari, SH, MH",
    roleId: "Sekretaris",
    roleEn: "Secretary",
    roleAr: "أمين السر",
    group: "pengurus_harian",
    imageUrl: "/img/leadership/azhari.jpg",
    order: 3,
  },
  {
    name: "Annisa Rahima Ananda Azwi",
    roleId: "Bendahara",
    roleEn: "Treasurer",
    roleAr: "أمين الصندوق",
    group: "pengurus_harian",
    imageUrl: "/img/leadership/anissa.jpeg",
    order: 4,
  },
];

const CONTACT_INFO = [
  {
    icon: "location_on",
    labelId: "ALAMAT KANTOR",
    labelEn: "OFFICE ADDRESS",
    labelAr: "عنوان المكتب",
    value: "Jl. Sejahtera No. 21\nMedan, Sumatera Utara",
    order: 0,
  },
  {
    icon: "mail",
    labelId: "EMAIL",
    labelEn: "EMAIL",
    labelAr: "البريد الإلكتروني",
    value: "info@yayasputraprabu.or.id",
    order: 1,
  },
  {
    icon: "call",
    labelId: "TELEPON",
    labelEn: "PHONE",
    labelAr: "الهاتف",
    value: "+62 61 1234 5678",
    order: 2,
  },
];

// Rather than skipping entirely once any row exists, each item is matched
// against existing data and only missing EN/AR translations are backfilled
// (existing values, including any admin edits, are never overwritten). This
// keeps the seed safe to re-run and fixes rows created before translated
// columns existed, whose EN/AR fields would otherwise stay NULL forever.

async function seedServices() {
  let created = 0;
  let backfilled = 0;
  for (const item of SERVICES) {
    const existing = await prisma.service.findFirst({ where: { titleId: item.titleId } });
    if (!existing) {
      await prisma.service.create({ data: item });
      created++;
      continue;
    }
    if (!existing.titleEn || !existing.titleAr || !existing.descriptionEn || !existing.descriptionAr) {
      await prisma.service.update({
        where: { id: existing.id },
        data: {
          titleEn: existing.titleEn ?? item.titleEn,
          titleAr: existing.titleAr ?? item.titleAr,
          descriptionEn: existing.descriptionEn ?? item.descriptionEn,
          descriptionAr: existing.descriptionAr ?? item.descriptionAr,
        },
      });
      backfilled++;
    }
  }
  console.log(`- Service: ${created} data ditambahkan, ${backfilled} data dilengkapi terjemahannya.`);
}

async function seedLeadership() {
  let created = 0;
  let backfilled = 0;
  for (const item of LEADERSHIP) {
    const existing = await prisma.leader.findFirst({ where: { name: item.name } });
    if (!existing) {
      await prisma.leader.create({ data: item });
      created++;
      continue;
    }
    if (!existing.roleEn || !existing.roleAr) {
      await prisma.leader.update({
        where: { id: existing.id },
        data: {
          roleEn: existing.roleEn ?? item.roleEn,
          roleAr: existing.roleAr ?? item.roleAr,
        },
      });
      backfilled++;
    }
  }
  console.log(`- Leader: ${created} data ditambahkan, ${backfilled} data dilengkapi terjemahannya.`);
}

async function seedContactInfo() {
  let created = 0;
  let backfilled = 0;
  for (const item of CONTACT_INFO) {
    const existing = await prisma.contactInfo.findFirst({ where: { labelId: item.labelId } });
    if (!existing) {
      await prisma.contactInfo.create({ data: item });
      created++;
      continue;
    }
    if (!existing.labelEn || !existing.labelAr) {
      await prisma.contactInfo.update({
        where: { id: existing.id },
        data: {
          labelEn: existing.labelEn ?? item.labelEn,
          labelAr: existing.labelAr ?? item.labelAr,
        },
      });
      backfilled++;
    }
  }
  console.log(`- ContactInfo: ${created} data ditambahkan, ${backfilled} data dilengkapi terjemahannya.`);
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
