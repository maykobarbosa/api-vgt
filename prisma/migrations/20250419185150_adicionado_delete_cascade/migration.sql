-- DropForeignKey
ALTER TABLE `empresas` DROP FOREIGN KEY `empresas_donoId_fkey`;

-- DropForeignKey
ALTER TABLE `mensagens_negociacao` DROP FOREIGN KEY `mensagens_negociacao_negociacaoId_fkey`;

-- DropForeignKey
ALTER TABLE `negociacao_para_proposta` DROP FOREIGN KEY `negociacao_para_proposta_propostaId_fkey`;

-- DropForeignKey
ALTER TABLE `proposta_investimento` DROP FOREIGN KEY `proposta_investimento_companyId_fkey`;

-- AddForeignKey
ALTER TABLE `empresas` ADD CONSTRAINT `empresas_donoId_fkey` FOREIGN KEY (`donoId`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `proposta_investimento` ADD CONSTRAINT `proposta_investimento_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `empresas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `negociacao_para_proposta` ADD CONSTRAINT `negociacao_para_proposta_propostaId_fkey` FOREIGN KEY (`propostaId`) REFERENCES `proposta_investimento`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mensagens_negociacao` ADD CONSTRAINT `mensagens_negociacao_negociacaoId_fkey` FOREIGN KEY (`negociacaoId`) REFERENCES `negociacao_para_proposta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
