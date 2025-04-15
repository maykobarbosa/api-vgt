/*
  Warnings:

  - You are about to drop the `colaboradores` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `departamentos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `despesas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `grupo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lancamentos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `leads` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `negociacoes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notificacoes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pessoa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `propostas_de_negocio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `socios` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `startup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuarios_externos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `valuation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `colaboradores` DROP FOREIGN KEY `colaboradores_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `colaboradores` DROP FOREIGN KEY `colaboradores_peopleId_fkey`;

-- DropForeignKey
ALTER TABLE `grupo` DROP FOREIGN KEY `grupo_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `grupo` DROP FOREIGN KEY `grupo_memberId_fkey`;

-- DropForeignKey
ALTER TABLE `lancamentos` DROP FOREIGN KEY `lancamentos_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `lancamentos` DROP FOREIGN KEY `lancamentos_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `negociacoes` DROP FOREIGN KEY `negociacoes_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `negociacoes` DROP FOREIGN KEY `negociacoes_businessId_fkey`;

-- DropForeignKey
ALTER TABLE `negociacoes` DROP FOREIGN KEY `negociacoes_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `notificacoes` DROP FOREIGN KEY `notificacoes_userId_fkey`;

-- DropForeignKey
ALTER TABLE `propostas_de_negocio` DROP FOREIGN KEY `propostas_de_negocio_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `propostas_de_negocio` DROP FOREIGN KEY `propostas_de_negocio_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `socios` DROP FOREIGN KEY `socios_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `socios` DROP FOREIGN KEY `socios_peopleId_fkey`;

-- DropForeignKey
ALTER TABLE `valuation` DROP FOREIGN KEY `valuation_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `valuation` DROP FOREIGN KEY `valuation_companyId_fkey`;

-- DropTable
DROP TABLE `colaboradores`;

-- DropTable
DROP TABLE `departamentos`;

-- DropTable
DROP TABLE `despesas`;

-- DropTable
DROP TABLE `grupo`;

-- DropTable
DROP TABLE `lancamentos`;

-- DropTable
DROP TABLE `leads`;

-- DropTable
DROP TABLE `negociacoes`;

-- DropTable
DROP TABLE `notificacoes`;

-- DropTable
DROP TABLE `pessoa`;

-- DropTable
DROP TABLE `propostas_de_negocio`;

-- DropTable
DROP TABLE `socios`;

-- DropTable
DROP TABLE `startup`;

-- DropTable
DROP TABLE `usuarios_externos`;

-- DropTable
DROP TABLE `valuation`;

-- CreateTable
CREATE TABLE `proposta_investimento` (
    `id` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDENTE', 'ACEITA', 'RECUSADA', 'CONTRAPROPOSTA') NOT NULL DEFAULT 'PENDENTE',
    `titulo` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `valor_investimento` VARCHAR(191) NOT NULL,
    `participacao_acionaria` VARCHAR(191) NOT NULL,
    `autorId` VARCHAR(191) NOT NULL,
    `companyId` VARCHAR(191) NOT NULL,
    `data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_atualizacao` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `negociacao_para_proposta` (
    `id` VARCHAR(191) NOT NULL,
    `propostaId` VARCHAR(191) NOT NULL,
    `data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_atualizacao` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mensagens_negociacao` (
    `id` VARCHAR(191) NOT NULL,
    `autorId` VARCHAR(191) NOT NULL,
    `negociacaoId` VARCHAR(191) NOT NULL,
    `data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_atualizacao` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `proposta_investimento` ADD CONSTRAINT `proposta_investimento_autorId_fkey` FOREIGN KEY (`autorId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `proposta_investimento` ADD CONSTRAINT `proposta_investimento_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `empresas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `negociacao_para_proposta` ADD CONSTRAINT `negociacao_para_proposta_propostaId_fkey` FOREIGN KEY (`propostaId`) REFERENCES `proposta_investimento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mensagens_negociacao` ADD CONSTRAINT `mensagens_negociacao_autorId_fkey` FOREIGN KEY (`autorId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mensagens_negociacao` ADD CONSTRAINT `mensagens_negociacao_negociacaoId_fkey` FOREIGN KEY (`negociacaoId`) REFERENCES `negociacao_para_proposta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
