/*
  Warnings:

  - You are about to alter the column `breakeven` on the `Leads` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.
  - You are about to alter the column `runrate` on the `Leads` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Leads` MODIFY `breakeven` VARCHAR(191) NULL,
    MODIFY `runrate` VARCHAR(191) NULL;
