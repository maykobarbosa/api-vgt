/*
  Warnings:

  - A unique constraint covering the columns `[mail]` on the table `pessoa` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `pessoa_mail_key` ON `pessoa`(`mail`);
