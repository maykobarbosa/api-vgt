/*
  Warnings:

  - You are about to alter the column `have_reserva` on the `empresas` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `empresas` MODIFY `have_reserva` BOOLEAN NULL;
