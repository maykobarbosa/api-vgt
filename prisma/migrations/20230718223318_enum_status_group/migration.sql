/*
  Warnings:

  - You are about to drop the column `statusId` on the `grupo` table. All the data in the column will be lost.
  - You are about to drop the `status` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status` to the `grupo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `grupo` DROP FOREIGN KEY `grupo_statusId_fkey`;

-- AlterTable
ALTER TABLE `grupo` DROP COLUMN `statusId`,
    ADD COLUMN `status` ENUM('PENDENTE', 'APROVADO', 'NEGADO') NOT NULL;

-- DropTable
DROP TABLE `status`;
