-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `annual_income_ornet_worth` VARCHAR(191) NULL,
    ADD COLUMN `goal` VARCHAR(191) NULL,
    ADD COLUMN `how_long_do_you_invest` VARCHAR(191) NULL,
    ADD COLUMN `isInvestor` BOOLEAN NULL,
    ADD COLUMN `link_or_social_networks` VARCHAR(191) NULL,
    ADD COLUMN `main_investments` VARCHAR(191) NULL,
    ADD COLUMN `sources_of_income` VARCHAR(191) NULL,
    ADD COLUMN `what_are_your_growth_expectations` TEXT NULL;
