-- CreateTable
CREATE TABLE `usuarios` (
    `id` VARCHAR(191) NOT NULL,
    `type` ENUM('INVESTIDOR', 'EMPREENDEDOR') NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `data_nascimento` VARCHAR(191) NOT NULL,
    `tempo_experiencia` VARCHAR(191) NULL,
    `tipos_investimento` VARCHAR(191) NULL,
    `fontes_renda` VARCHAR(191) NULL,
    `renda_anual` VARCHAR(191) NULL,
    `localizacao` VARCHAR(191) NULL,
    `instagram` VARCHAR(191) NULL,
    `facebook` VARCHAR(191) NULL,
    `linkedin` VARCHAR(191) NULL,
    `website` VARCHAR(191) NULL,
    `biografia` VARCHAR(191) NULL,
    `Administrador` BOOLEAN NOT NULL DEFAULT false,
    `token_recover_password` VARCHAR(191) NULL,
    `date_update` DATETIME(3) NOT NULL,
    `date_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `usuarios_email_key`(`email`),
    UNIQUE INDEX `usuarios_token_recover_password_key`(`token_recover_password`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `empresas` (
    `id` VARCHAR(191) NOT NULL,
    `logotipo` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `setor` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `cnpj` VARCHAR(191) NOT NULL,
    `contato` VARCHAR(191) NOT NULL,
    `biografia` VARCHAR(191) NULL,
    `instagram` VARCHAR(191) NULL,
    `facebook` VARCHAR(191) NULL,
    `linkedin` VARCHAR(191) NULL,
    `youtube` VARCHAR(191) NULL,
    `x` VARCHAR(191) NULL,
    `site` VARCHAR(191) NULL,
    `patrimonio` INTEGER NULL,
    `reserva_financeira` INTEGER NULL,
    `acordo_operacional` BOOLEAN NULL,
    `estrutura_governanca` BOOLEAN NULL,
    `projecao_crescimento` VARCHAR(191) NULL,
    `projecao_futura` VARCHAR(191) NULL,
    `competidores` VARCHAR(191) NULL,
    `donoId` VARCHAR(191) NOT NULL,
    `date_update` DATETIME(3) NOT NULL,
    `date_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grupo` (
    `id` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDENTE', 'APROVADO', 'NEGADO') NOT NULL,
    `companyId` VARCHAR(191) NOT NULL,
    `memberId` VARCHAR(191) NOT NULL,
    `viewedNotification` BOOLEAN NOT NULL,
    `authorId` VARCHAR(191) NOT NULL,
    `date_update` DATETIME(3) NOT NULL,
    `date_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lancamentos` (
    `id` VARCHAR(191) NOT NULL,
    `month` INTEGER NOT NULL,
    `year` INTEGER NOT NULL,
    `valuation` DOUBLE NULL,
    `lucroLiquido` DOUBLE NOT NULL,
    `receitaLiquida` DOUBLE NOT NULL,
    `despesaBruta` DOUBLE NOT NULL,
    `docs` VARCHAR(191) NULL,
    `companyId` VARCHAR(191) NOT NULL,
    `authorId` VARCHAR(191) NOT NULL,
    `date_update` DATETIME(3) NOT NULL,
    `date_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `departamentos` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
    `avatar` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `office` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `contact` VARCHAR(191) NOT NULL,
    `date_update` DATETIME(3) NOT NULL,
    `date_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `pessoa_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `despesas` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `startup` (
    `id` VARCHAR(191) NOT NULL,
    `companyName` VARCHAR(191) NOT NULL,
    `describe` TEXT NOT NULL,
    `sizeCompany` VARCHAR(191) NOT NULL,
    `presentationLink` VARCHAR(191) NOT NULL,
    `usefulLink` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `date_update` DATETIME(3) NOT NULL,
    `date_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `valuation` (
    `id` VARCHAR(191) NOT NULL,
    `value` DOUBLE NOT NULL,
    `docs` VARCHAR(191) NOT NULL,
    `companyId` VARCHAR(191) NOT NULL,
    `authorId` VARCHAR(191) NOT NULL,
    `date_update` DATETIME(3) NOT NULL,
    `date_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

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
CREATE TABLE `leads` (
    `id` VARCHAR(191) NOT NULL,
    `company` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `valuation` DOUBLE NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `name_of_person_responsible` VARCHAR(191) NULL,
    `whatsapp_of_person_responsible` VARCHAR(191) NULL,
    `foundation_date` VARCHAR(191) NULL,
    `site` VARCHAR(191) NULL,
    `segmento` VARCHAR(191) NULL,
    `business_model` VARCHAR(191) NULL,
    `locality` VARCHAR(191) NULL,
    `investment_stage` VARCHAR(191) NULL,
    `operational_stage` VARCHAR(191) NULL,
    `arr` DOUBLE NULL,
    `mrr` DOUBLE NULL,
    `ntm` DOUBLE NULL,
    `profit_margin` DOUBLE NULL,
    `burnrate` DOUBLE NULL,
    `breakeven` VARCHAR(191) NULL,
    `runrate` VARCHAR(191) NULL,
    `projected_revenue_for_the_year` DOUBLE NULL,
    `projected_ebitda` DOUBLE NULL,
    `immobilized` DOUBLE NULL,
    `current_annual_investment` DOUBLE NULL,
    `annual_investment_next_5_years` DOUBLE NULL,
    `cash_and_stock_value` DOUBLE NULL,
    `debt` DOUBLE NULL,
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
ALTER TABLE `empresas` ADD CONSTRAINT `empresas_donoId_fkey` FOREIGN KEY (`donoId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `grupo` ADD CONSTRAINT `grupo_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `empresas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `grupo` ADD CONSTRAINT `grupo_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lancamentos` ADD CONSTRAINT `lancamentos_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `empresas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lancamentos` ADD CONSTRAINT `lancamentos_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `socios` ADD CONSTRAINT `socios_peopleId_fkey` FOREIGN KEY (`peopleId`) REFERENCES `pessoa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `socios` ADD CONSTRAINT `socios_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `empresas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `colaboradores` ADD CONSTRAINT `colaboradores_peopleId_fkey` FOREIGN KEY (`peopleId`) REFERENCES `pessoa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `colaboradores` ADD CONSTRAINT `colaboradores_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `empresas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
