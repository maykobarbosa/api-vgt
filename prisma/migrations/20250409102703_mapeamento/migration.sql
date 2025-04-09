/*
  Warnings:

  - You are about to drop the `businessproposal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `department` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `document` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `expenses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `externalusers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `negotiation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notifications` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `businessproposal` DROP FOREIGN KEY `BusinessProposal_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `businessproposal` DROP FOREIGN KEY `BusinessProposal_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `document` DROP FOREIGN KEY `Document_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `document` DROP FOREIGN KEY `Document_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `negotiation` DROP FOREIGN KEY `Negotiation_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `negotiation` DROP FOREIGN KEY `Negotiation_businessId_fkey`;

-- DropForeignKey
ALTER TABLE `negotiation` DROP FOREIGN KEY `Negotiation_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `notifications` DROP FOREIGN KEY `Notifications_userId_fkey`;

-- DropForeignKey
ALTER TABLE `valuation` DROP FOREIGN KEY `Valuation_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `valuation` DROP FOREIGN KEY `Valuation_companyId_fkey`;

-- DropTable
DROP TABLE `businessproposal`;

-- DropTable
DROP TABLE `department`;

-- DropTable
DROP TABLE `document`;

-- DropTable
DROP TABLE `expenses`;

-- DropTable
DROP TABLE `externalusers`;

-- DropTable
DROP TABLE `negotiation`;

-- DropTable
DROP TABLE `notifications`;

-- CreateTable
CREATE TABLE `departamentos` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `despesas` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documentos` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `uri` VARCHAR(191) NOT NULL,
    `companyId` VARCHAR(191) NOT NULL,
    `authorId` VARCHAR(191) NOT NULL,
    `date_update` DATETIME(3) NOT NULL,
    `date_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `propostas_de_negocio` (
    `id` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDENTE', 'APROVADO', 'RECUSADO', 'CONTRAPROPOSTA') NOT NULL,
    `authorId` VARCHAR(191) NOT NULL,
    `proposed_investment` DOUBLE NOT NULL,
    `financial_participation` DOUBLE NOT NULL,
    `investment_purpose` VARCHAR(191) NOT NULL,
    `investment_return_period` VARCHAR(191) NOT NULL,
    `message` TEXT NOT NULL,
    `companyId` VARCHAR(191) NOT NULL,
    `date_update` DATETIME(3) NOT NULL,
    `date_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `negociacoes` (
    `id` VARCHAR(191) NOT NULL,
    `report` ENUM('PENDENTE', 'APROVADO', 'RECUSADO', 'CONTRAPROPOSTA') NOT NULL,
    `businessId` VARCHAR(191) NOT NULL,
    `authorId` VARCHAR(191) NOT NULL,
    `proposed_investment` DOUBLE NULL,
    `financial_participation` DOUBLE NULL,
    `investment_purpose` TEXT NULL,
    `investment_return_period` VARCHAR(191) NULL,
    `message` TEXT NULL,
    `companyId` VARCHAR(191) NOT NULL,
    `date_update` DATETIME(3) NOT NULL,
    `date_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notificacoes` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `viewed` BOOLEAN NOT NULL,
    `message` TEXT NOT NULL,
    `link` VARCHAR(191) NULL,
    `date_update` DATETIME(3) NOT NULL,
    `date_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios_externos` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `date_update` DATETIME(3) NOT NULL,
    `date_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `valuation` ADD CONSTRAINT `valuation_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `empresas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `valuation` ADD CONSTRAINT `valuation_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos` ADD CONSTRAINT `documentos_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `empresas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos` ADD CONSTRAINT `documentos_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `propostas_de_negocio` ADD CONSTRAINT `propostas_de_negocio_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `propostas_de_negocio` ADD CONSTRAINT `propostas_de_negocio_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `empresas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `negociacoes` ADD CONSTRAINT `negociacoes_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `propostas_de_negocio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `negociacoes` ADD CONSTRAINT `negociacoes_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `negociacoes` ADD CONSTRAINT `negociacoes_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `empresas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notificacoes` ADD CONSTRAINT `notificacoes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
