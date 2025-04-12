/*
  Warnings:

  - You are about to alter the column `acordo_operacional` on the `empresas` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.
  - You are about to alter the column `estrutura_governanca` on the `empresas` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `empresas` MODIFY `patrimonio` VARCHAR(191) NULL,
    MODIFY `reserva_financeira` VARCHAR(191) NULL,
    MODIFY `acordo_operacional` VARCHAR(191) NULL,
    MODIFY `estrutura_governanca` VARCHAR(191) NULL;
