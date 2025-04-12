/*
  Warnings:

  - You are about to drop the `documentos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `YTD` to the `empresas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `caixa` to the `empresas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contratos` to the `empresas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `despesas` to the `empresas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dividas` to the `empresas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imposto` to the `empresas` table without a default value. This is not possible if the table is not empty.
  - Made the column `patrimonio` on table `empresas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `reserva_financeira` on table `empresas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `acordo_operacional` on table `empresas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `estrutura_governanca` on table `empresas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `projecao_crescimento` on table `empresas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `projecao_futura` on table `empresas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `competidores` on table `empresas` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `documentos` DROP FOREIGN KEY `documentos_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `documentos` DROP FOREIGN KEY `documentos_companyId_fkey`;

-- AlterTable
ALTER TABLE `empresas` ADD COLUMN `YTD` VARCHAR(191) NOT NULL,
    ADD COLUMN `caixa` VARCHAR(191) NOT NULL,
    ADD COLUMN `contratos` VARCHAR(191) NOT NULL,
    ADD COLUMN `despesas` VARCHAR(191) NOT NULL,
    ADD COLUMN `dividas` VARCHAR(191) NOT NULL,
    ADD COLUMN `imposto` VARCHAR(191) NOT NULL,
    MODIFY `patrimonio` VARCHAR(191) NOT NULL,
    MODIFY `reserva_financeira` VARCHAR(191) NOT NULL,
    MODIFY `acordo_operacional` VARCHAR(191) NOT NULL,
    MODIFY `estrutura_governanca` VARCHAR(191) NOT NULL,
    MODIFY `projecao_crescimento` VARCHAR(191) NOT NULL,
    MODIFY `projecao_futura` VARCHAR(191) NOT NULL,
    MODIFY `competidores` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `documentos`;
