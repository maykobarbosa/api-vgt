/*
  Warnings:

  - Added the required column `authorId` to the `empresas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `empresas` ADD COLUMN `authorId` VARCHAR(191) NOT NULL;
