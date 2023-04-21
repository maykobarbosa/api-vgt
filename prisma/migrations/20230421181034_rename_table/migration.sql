/*
  Warnings:

  - You are about to drop the column `cpf` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `data_criacao` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `nome_completo` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `perfil` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `senha` on the `usuarios` table. All the data in the column will be lost.
  - Added the required column `full_name` to the `usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `usuarios_cpf_key` ON `usuarios`;

-- AlterTable
ALTER TABLE `usuarios` DROP COLUMN `cpf`,
    DROP COLUMN `data_criacao`,
    DROP COLUMN `nome_completo`,
    DROP COLUMN `perfil`,
    DROP COLUMN `senha`,
    ADD COLUMN `date_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `full_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `profile` VARCHAR(191) NOT NULL;
