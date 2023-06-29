/*
  Warnings:

  - You are about to drop the column `mail` on the `pessoa` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `pessoa` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `pessoa` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `pessoa_mail_key` ON `pessoa`;

-- AlterTable
ALTER TABLE `pessoa` DROP COLUMN `mail`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `pessoa_email_key` ON `pessoa`(`email`);
