-- CreateTable
CREATE TABLE `Company` (
    `id` VARCHAR(191) NOT NULL,
    `isAdmin` BOOLEAN NULL,
    `company_name` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `cell_phone` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `he_knew` VARCHAR(191) NOT NULL,
    `business` VARCHAR(191) NOT NULL,
    `help` VARCHAR(191) NOT NULL,
    `message` TEXT NULL,
    `date_update` DATETIME(3) NOT NULL,
    `date_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Company_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
