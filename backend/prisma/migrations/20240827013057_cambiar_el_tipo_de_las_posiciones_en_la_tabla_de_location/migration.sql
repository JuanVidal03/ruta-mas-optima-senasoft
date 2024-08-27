/*
  Warnings:

  - You are about to alter the column `posX` on the `Location` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `posY` on the `Location` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Location` MODIFY `posX` DOUBLE NOT NULL,
    MODIFY `posY` DOUBLE NOT NULL;
