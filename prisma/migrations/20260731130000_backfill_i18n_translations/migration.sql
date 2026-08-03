-- The previous migration (add_i18n_fields) only copied the existing
-- single-language text into the new "...Id" (Indonesian) columns; rows
-- created before this feature existed were left with NULL "...En"/"...Ar"
-- translations. This backfills the known English/Arabic translations
-- (matching prisma/seed.ts) for the original seeded Service/Leader/
-- ContactInfo rows, so switching the site to EN/AR actually shows
-- translated content instead of silently falling back to Indonesian.
--
-- Admin-created content (e.g. NewsArticle rows) has no predetermined
-- translation and is intentionally left alone here — translate it via
-- the admin panel's per-language tabs instead.

-- Service --------------------------------------------------------------
UPDATE `service` SET
    `titleEn` = 'Playgroup Education',
    `titleAr` = 'تعليم الروضة',
    `descriptionEn` = 'Shaping Islamic character from an early age through fun and interactive learning methods.',
    `descriptionAr` = 'تكوين الشخصية الإسلامية منذ الصغر من خلال أساليب تعلّم ممتعة وتفاعلية.'
WHERE `titleId` = 'Pendidikan Kelompok Bermain' AND `titleEn` IS NULL;

UPDATE `service` SET
    `titleEn` = 'Elementary School',
    `titleAr` = 'المدرسة الابتدائية',
    `descriptionEn` = 'Basic education that integrates the national curriculum with a deep understanding of religion.',
    `descriptionAr` = 'تعليم أساسي يدمج المنهج الوطني مع فهم ديني عميق.'
WHERE `titleId` = 'Sekolah Dasar (SD)' AND `titleEn` IS NULL;

UPDATE `service` SET
    `titleEn` = 'Junior High School',
    `titleAr` = 'المدرسة المتوسطة',
    `descriptionEn` = 'Preparing teenagers with general knowledge and manners grounded in the Qur''an and Sunnah.',
    `descriptionAr` = 'إعداد المراهقين بالمعرفة العامة والأدب القائم على القرآن والسنة.'
WHERE `titleId` = 'Sekolah Menengah Pertama (SMP)' AND `titleEn` IS NULL;

UPDATE `service` SET
    `titleEn` = 'Senior High School',
    `titleAr` = 'المدرسة الثانوية',
    `descriptionEn` = 'Advanced education focused on academic excellence, leadership, and college readiness.',
    `descriptionAr` = 'تعليم متقدم يركز على التميز الأكاديمي والقيادة والاستعداد للجامعة.'
WHERE `titleId` = 'Sekolah Menengah Atas (SMA)' AND `titleEn` IS NULL;

UPDATE `service` SET
    `titleEn` = 'Research & Development (Electricity)',
    `titleAr` = 'البحث والتطوير (الكهرباء)',
    `descriptionEn` = 'Technological innovation and ongoing research in the field of electricity for the benefit of the community.',
    `descriptionAr` = 'ابتكار تكنولوجي وبحث مستمر في مجال الكهرباء لمصلحة المجتمع.'
WHERE `titleId` = 'Penelitian & Pengembangan (Electricity)' AND `titleEn` IS NULL;

UPDATE `service` SET
    `titleEn` = 'Catering Services',
    `titleAr` = 'خدمات التموين',
    `descriptionEn` = 'Professional catering services guaranteed to be halal, clean, and delicious for various needs.',
    `descriptionAr` = 'خدمات تموين احترافية مضمونة الحلال والنظافة والمذاق لمختلف الاحتياجات.'
WHERE `titleId` = 'Penyediaan Jasa Boga' AND `titleEn` IS NULL;

-- Leader -----------------------------------------------------------------
UPDATE `leader` SET
    `roleEn` = 'Chairman of the Board of Trustees',
    `roleAr` = 'رئيس مجلس الأمناء'
WHERE `name` = 'Priyo Iswanto' AND `roleEn` IS NULL;

UPDATE `leader` SET
    `roleEn` = 'Chairman of the Board of Supervisors',
    `roleAr` = 'رئيس مجلس الرقابة'
WHERE `name` = 'Abdul Razaq Ananda Azwi' AND `roleEn` IS NULL;

UPDATE `leader` SET
    `roleEn` = 'Chairman',
    `roleAr` = 'الرئيس'
WHERE `name` = 'Hari Mulyono' AND `roleEn` IS NULL;

UPDATE `leader` SET
    `roleEn` = 'Secretary',
    `roleAr` = 'أمين السر'
WHERE `name` = 'Ir. Muhammad Azhari, SH, MH' AND `roleEn` IS NULL;

UPDATE `leader` SET
    `roleEn` = 'Treasurer',
    `roleAr` = 'أمين الصندوق'
WHERE `name` = 'Annisa Rahima Ananda Azwi' AND `roleEn` IS NULL;

-- ContactInfo --------------------------------------------------------
UPDATE `contactinfo` SET
    `labelEn` = 'OFFICE ADDRESS',
    `labelAr` = 'عنوان المكتب'
WHERE `labelId` = 'ALAMAT KANTOR' AND `labelEn` IS NULL;

UPDATE `contactinfo` SET
    `labelEn` = 'EMAIL',
    `labelAr` = 'البريد الإلكتروني'
WHERE `labelId` = 'EMAIL' AND `labelEn` IS NULL;

UPDATE `contactinfo` SET
    `labelEn` = 'PHONE',
    `labelAr` = 'الهاتف'
WHERE `labelId` = 'TELEPON' AND `labelEn` IS NULL;
