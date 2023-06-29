/*
  Warnings:

  - Added the required column `avatar` to the `pessoa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pessoa` ADD COLUMN `avatar` VARCHAR(191) NOT NULL;
