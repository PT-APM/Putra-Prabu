-- Add per-locale (id/en/ar) columns for translatable content, backfill
-- them from the existing single-language columns, then drop the old ones.

-- NewsArticle --------------------------------------------------------
ALTER TABLE `newsarticle`
    ADD COLUMN `titleId` VARCHAR(191) NULL,
    ADD COLUMN `titleEn` VARCHAR(191) NULL,
    ADD COLUMN `titleAr` VARCHAR(191) NULL,
    ADD COLUMN `summaryId` TEXT NULL,
    ADD COLUMN `summaryEn` TEXT NULL,
    ADD COLUMN `summaryAr` TEXT NULL,
    ADD COLUMN `contentId` TEXT NULL,
    ADD COLUMN `contentEn` TEXT NULL,
    ADD COLUMN `contentAr` TEXT NULL,
    ADD COLUMN `categoryId` VARCHAR(191) NULL,
    ADD COLUMN `categoryEn` VARCHAR(191) NULL,
    ADD COLUMN `categoryAr` VARCHAR(191) NULL;

UPDATE `newsarticle` SET
    `titleId` = `title`,
    `summaryId` = `summary`,
    `contentId` = `content`,
    `categoryId` = `category`;

ALTER TABLE `newsarticle`
    MODIFY COLUMN `titleId` VARCHAR(191) NOT NULL,
    MODIFY COLUMN `summaryId` TEXT NOT NULL,
    MODIFY COLUMN `categoryId` VARCHAR(191) NOT NULL,
    DROP COLUMN `title`,
    DROP COLUMN `summary`,
    DROP COLUMN `content`,
    DROP COLUMN `category`;

-- Service --------------------------------------------------------------
ALTER TABLE `service`
    ADD COLUMN `titleId` VARCHAR(191) NULL,
    ADD COLUMN `titleEn` VARCHAR(191) NULL,
    ADD COLUMN `titleAr` VARCHAR(191) NULL,
    ADD COLUMN `descriptionId` TEXT NULL,
    ADD COLUMN `descriptionEn` TEXT NULL,
    ADD COLUMN `descriptionAr` TEXT NULL;

UPDATE `service` SET
    `titleId` = `title`,
    `descriptionId` = `description`;

ALTER TABLE `service`
    MODIFY COLUMN `titleId` VARCHAR(191) NOT NULL,
    MODIFY COLUMN `descriptionId` TEXT NOT NULL,
    DROP COLUMN `title`,
    DROP COLUMN `description`;

-- Leader -----------------------------------------------------------------
-- `group` keeps its column but its values move from display text
-- ("Pembina") to stable keys ("pembina") — the translated label is
-- resolved from the i18n dictionary at render time.
ALTER TABLE `leader`
    ADD COLUMN `roleId` VARCHAR(191) NULL,
    ADD COLUMN `roleEn` VARCHAR(191) NULL,
    ADD COLUMN `roleAr` VARCHAR(191) NULL;

UPDATE `leader` SET `roleId` = `role`;

UPDATE `leader` SET `group` = 'pembina' WHERE `group` = 'Pembina';
UPDATE `leader` SET `group` = 'pengawas' WHERE `group` = 'Pengawas';
UPDATE `leader` SET `group` = 'pengurus_harian' WHERE `group` = 'Pengurus Harian';

ALTER TABLE `leader`
    MODIFY COLUMN `roleId` VARCHAR(191) NOT NULL,
    DROP COLUMN `role`;

-- ContactInfo --------------------------------------------------------
ALTER TABLE `contactinfo`
    ADD COLUMN `labelId` VARCHAR(191) NULL,
    ADD COLUMN `labelEn` VARCHAR(191) NULL,
    ADD COLUMN `labelAr` VARCHAR(191) NULL;

UPDATE `contactinfo` SET `labelId` = `label`;

ALTER TABLE `contactinfo`
    MODIFY COLUMN `labelId` VARCHAR(191) NOT NULL,
    DROP COLUMN `label`;
