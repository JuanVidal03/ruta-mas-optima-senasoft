/*
  Warnings:

  - You are about to drop the column `finalLoc` on the `connection` table. All the data in the column will be lost.
  - You are about to drop the column `initialLoc` on the `connection` table. All the data in the column will be lost.
  - Added the required column `location1` to the `Connection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location2` to the `Connection` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `connection` DROP FOREIGN KEY `Connection_finalLoc_fkey`;

-- DropForeignKey
ALTER TABLE `connection` DROP FOREIGN KEY `Connection_initialLoc_fkey`;

-- AlterTable
ALTER TABLE `connection` DROP COLUMN `finalLoc`,
    DROP COLUMN `initialLoc`,
    ADD COLUMN `location1` INTEGER NOT NULL,
    ADD COLUMN `location2` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Connection` ADD CONSTRAINT `Connection_location1_fkey` FOREIGN KEY (`location1`) REFERENCES `Location`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Connection` ADD CONSTRAINT `Connection_location2_fkey` FOREIGN KEY (`location2`) REFERENCES `Location`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
