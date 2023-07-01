/*
  Warnings:

  - You are about to drop the column `despesaBruta` on the `empresas` table. All the data in the column will be lost.
  - You are about to drop the column `lucroLiquido` on the `empresas` table. All the data in the column will be lost.
  - You are about to drop the column `receitaLiquida` on the `empresas` table. All the data in the column will be lost.
  - You are about to drop the column `valuation` on the `empresas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `empresas` DROP COLUMN `despesaBruta`,
    DROP COLUMN `lucroLiquido`,
    DROP COLUMN `receitaLiquida`,
    DROP COLUMN `valuation`;

-- CreateTable
CREATE TABLE `lancamentos` (
    `id` VARCHAR(191) NOT NULL,
    `month` INTEGER NOT NULL,
    `year` INTEGER NOT NULL,
    `valuation` DOUBLE NOT NULL,
    `lucroLiquido` DOUBLE NOT NULL,
    `receitaLiquida` DOUBLE NOT NULL,
    `despesaBruta` DOUBLE NOT NULL,
    `companyId` VARCHAR(191) NOT NULL,
    `date_update` DATETIME(3) NOT NULL,
    `date_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `lancamentos` ADD CONSTRAINT `lancamentos_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `empresas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
