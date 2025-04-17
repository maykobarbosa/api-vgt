-- CreateTable
CREATE TABLE `usuarios` (
    `id` VARCHAR(191) NOT NULL,
    `type` ENUM('INVESTIDOR', 'EMPREENDEDOR', 'ADMINISTRADOR') NOT NULL,
    `status` ENUM('APROVADO', 'RECUSADO', 'PENDENTE', 'LIXEIRA') NULL DEFAULT 'PENDENTE',
    `avatar` VARCHAR(191) NOT NULL,
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
    `token_recover_password` VARCHAR(191) NULL,
    `date_update` DATETIME(3) NOT NULL,
    `date_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `authorId` VARCHAR(191) NULL,

    UNIQUE INDEX `usuarios_email_key`(`email`),
    UNIQUE INDEX `usuarios_token_recover_password_key`(`token_recover_password`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `empresas` (
    `id` VARCHAR(191) NOT NULL,
    `logotipo` VARCHAR(191) NOT NULL,
    `status` ENUM('ANALISE', 'APROVADO', 'RECUSADO', 'LIXEIRA') NOT NULL DEFAULT 'ANALISE',
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
    `patrimonio` VARCHAR(191) NOT NULL,
    `reserva_financeira` VARCHAR(191) NOT NULL,
    `acordo_operacional` VARCHAR(191) NOT NULL,
    `estrutura_governanca` VARCHAR(191) NOT NULL,
    `projecao_crescimento` VARCHAR(191) NOT NULL,
    `projecao_futura` VARCHAR(191) NOT NULL,
    `competidores` VARCHAR(191) NOT NULL,
    `imposto` VARCHAR(191) NOT NULL,
    `YTD` VARCHAR(191) NOT NULL,
    `despesas` VARCHAR(191) NOT NULL,
    `dividas` VARCHAR(191) NOT NULL,
    `receitas` VARCHAR(191) NOT NULL,
    `contratos_firmados` VARCHAR(191) NOT NULL,
    `contratos_pendentes` VARCHAR(191) NOT NULL,
    `donoId` VARCHAR(191) NOT NULL,
    `date_update` DATETIME(3) NOT NULL,
    `date_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
ALTER TABLE `empresas` ADD CONSTRAINT `empresas_donoId_fkey` FOREIGN KEY (`donoId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
