-- AlterTable
ALTER TABLE `empresas` ADD COLUMN `future_projections` VARCHAR(191) NULL,
    ADD COLUMN `growth__projection` VARCHAR(191) NULL,
    ADD COLUMN `has_a_governance_structure` BOOLEAN NULL,
    ADD COLUMN `has_an_operating_agreement` BOOLEAN NULL,
    ADD COLUMN `has_assets` BOOLEAN NULL,
    ADD COLUMN `have_reserva` VARCHAR(191) NULL,
    ADD COLUMN `main_competitors_of_the_company` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Document` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `uri` VARCHAR(191) NOT NULL,
    `companyId` VARCHAR(191) NOT NULL,
    `authorId` VARCHAR(191) NOT NULL,
    `date_update` DATETIME(3) NOT NULL,
    `date_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Document` ADD CONSTRAINT `Document_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `empresas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Document` ADD CONSTRAINT `Document_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
