/*
  Warnings:

  - You are about to drop the column `isAdmin` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `isInvestor` on the `usuarios` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `usuarios` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `usuarios` DROP COLUMN `isAdmin`,
    DROP COLUMN `isInvestor`,
    MODIFY `status` VARCHAR(191) NULL;
