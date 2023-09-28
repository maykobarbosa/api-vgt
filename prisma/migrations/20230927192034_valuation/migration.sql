-- AlterTable
ALTER TABLE `lancamentos` MODIFY `valuation` DOUBLE NULL;

-- CreateTable
CREATE TABLE `Valuation` (
    `id` VARCHAR(191) NOT NULL,
    `value` DOUBLE NOT NULL,
    `docs` VARCHAR(191) NOT NULL,
    `companyId` VARCHAR(191) NOT NULL,
    `authorId` VARCHAR(191) NOT NULL,
    `date_update` DATETIME(3) NOT NULL,
    `date_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Valuation` ADD CONSTRAINT `Valuation_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `empresas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Valuation` ADD CONSTRAINT `Valuation_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
