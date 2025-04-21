/*
  Warnings:

  - You are about to drop the column `negociacaoId` on the `mensagens_negociacao` table. All the data in the column will be lost.
  - You are about to alter the column `valor_investimento` on the `proposta_investimento` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.
  - You are about to alter the column `participacao_acionaria` on the `proposta_investimento` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `negociacao_para_proposta` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `mensagem` to the `mensagens_negociacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propostaId` to the `mensagens_negociacao` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `mensagens_negociacao` DROP FOREIGN KEY `mensagens_negociacao_negociacaoId_fkey`;

-- DropForeignKey
ALTER TABLE `negociacao_para_proposta` DROP FOREIGN KEY `negociacao_para_proposta_propostaId_fkey`;

-- AlterTable
ALTER TABLE `mensagens_negociacao` DROP COLUMN `negociacaoId`,
    ADD COLUMN `mensagem` VARCHAR(191) NOT NULL,
    ADD COLUMN `participacao_acionaria` INTEGER NULL,
    ADD COLUMN `propostaId` VARCHAR(191) NOT NULL,
    ADD COLUMN `valor_investimento` BIGINT NULL;

-- AlterTable
ALTER TABLE `proposta_investimento` ADD COLUMN `statusNegociacao` ENUM('PENDENTE', 'ACEITA', 'RECUSADA') NOT NULL DEFAULT 'PENDENTE',
    MODIFY `valor_investimento` BIGINT NOT NULL,
    MODIFY `participacao_acionaria` INTEGER NOT NULL;

-- DropTable
DROP TABLE `negociacao_para_proposta`;

-- AddForeignKey
ALTER TABLE `mensagens_negociacao` ADD CONSTRAINT `mensagens_negociacao_propostaId_fkey` FOREIGN KEY (`propostaId`) REFERENCES `proposta_investimento`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
