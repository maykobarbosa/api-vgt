/*
  Warnings:

  - Added the required column `date_update` to the `StartUp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `StartUp` ADD COLUMN `date_create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `date_update` DATETIME(3) NOT NULL;
