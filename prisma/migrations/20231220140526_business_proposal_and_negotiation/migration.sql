-- CreateTable
CREATE TABLE `BusinessProposal` (
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
CREATE TABLE `Negotiation` (
    `id` VARCHAR(191) NOT NULL,
    `report` ENUM('PENDENTE', 'APROVADO', 'RECUSADO', 'CONTRAPROPOSTA') NOT NULL,
    `businessId` VARCHAR(191) NOT NULL,
    `authorId` VARCHAR(191) NOT NULL,
    `proposed_investment` DOUBLE NULL,
    `financial_participation` DOUBLE NULL,
    `investment_purpose` VARCHAR(191) NULL,
    `investment_return_period` VARCHAR(191) NULL,
    `message` TEXT NULL,
    `companyId` VARCHAR(191) NOT NULL,
    `date_update` DATETIME(3) NOT NULL,
    `date_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BusinessProposal` ADD CONSTRAINT `BusinessProposal_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BusinessProposal` ADD CONSTRAINT `BusinessProposal_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `empresas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Negotiation` ADD CONSTRAINT `Negotiation_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `BusinessProposal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Negotiation` ADD CONSTRAINT `Negotiation_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Negotiation` ADD CONSTRAINT `Negotiation_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `empresas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
