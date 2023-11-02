/*
  Warnings:

  - Added the required column `business` to the `usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `he_knew` to the `usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `help` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `business` VARCHAR(191) NOT NULL,
    ADD COLUMN `he_knew` VARCHAR(191) NOT NULL,
    ADD COLUMN `help` VARCHAR(191) NOT NULL,
    ADD COLUMN `isAdmin` BOOLEAN NULL,
    ADD COLUMN `message` TEXT NULL,
    ADD COLUMN `status` BOOLEAN NULL;
