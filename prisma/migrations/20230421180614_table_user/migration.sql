-- CreateTable
CREATE TABLE `usuarios` (
    `id` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `nome_completo` VARCHAR(191) NOT NULL,
    `fone` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `perfil` VARCHAR(191) NOT NULL,
    `token_recover_password` VARCHAR(191) NULL,
    `date_update` DATETIME(3) NOT NULL,
    `data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `usuarios_cpf_key`(`cpf`),
    UNIQUE INDEX `usuarios_email_key`(`email`),
    UNIQUE INDEX `usuarios_token_recover_password_key`(`token_recover_password`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
