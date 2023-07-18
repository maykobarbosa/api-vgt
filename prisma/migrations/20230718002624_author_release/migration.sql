/*
  Warnings:

  - Added the required column `authorId` to the `lancamentos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `lancamentos` ADD COLUMN `authorId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `lancamentos` ADD CONSTRAINT `lancamentos_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
