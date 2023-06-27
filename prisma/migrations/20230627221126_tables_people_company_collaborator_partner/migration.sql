/*
  Warnings:

  - You are about to drop the `Collaborators` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `avatar` to the `empresas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_update` to the `empresas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `despesaBruta` to the `empresas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lucroLiquido` to the `empresas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `empresas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receitaLiquida` to the `empresas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valuation` to the `empresas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `empresas` ADD COLUMN `avatar` VARCHAR(191) NOT NULL,
    ADD COLUMN `date_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `date_update` DATETIME(3) NOT NULL,
    ADD COLUMN `despesaBruta` DOUBLE NOT NULL,
    ADD COLUMN `lucroLiquido` DOUBLE NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `receitaLiquida` DOUBLE NOT NULL,
    ADD COLUMN `valuation` DOUBLE NOT NULL;

-- DropTable
DROP TABLE `Collaborators`;

-- CreateTable
CREATE TABLE `socios` (
    `id` VARCHAR(191) NOT NULL,
    `peopleId` VARCHAR(191) NOT NULL,
    `companyId` VARCHAR(191) NOT NULL,
    `date_update` DATETIME(3) NOT NULL,
    `date_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `colaboradores` (
    `id` VARCHAR(191) NOT NULL,
    `peopleId` VARCHAR(191) NOT NULL,
    `companyId` VARCHAR(191) NOT NULL,
    `date_update` DATETIME(3) NOT NULL,
    `date_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pessoa` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `office` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `mail` VARCHAR(191) NOT NULL,
    `contact` VARCHAR(191) NOT NULL,
    `date_update` DATETIME(3) NOT NULL,
    `date_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `socios` ADD CONSTRAINT `socios_peopleId_fkey` FOREIGN KEY (`peopleId`) REFERENCES `pessoa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `socios` ADD CONSTRAINT `socios_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `empresas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `colaboradores` ADD CONSTRAINT `colaboradores_peopleId_fkey` FOREIGN KEY (`peopleId`) REFERENCES `pessoa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `colaboradores` ADD CONSTRAINT `colaboradores_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `empresas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
