/*
  Warnings:

  - You are about to drop the column `growth__projection` on the `empresas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `empresas` DROP COLUMN `growth__projection`,
    ADD COLUMN `growth_projection` VARCHAR(191) NULL;
