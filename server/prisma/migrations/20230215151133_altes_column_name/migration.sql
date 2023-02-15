/*
  Warnings:

  - You are about to drop the `uploads` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `uploads` DROP FOREIGN KEY `uploads_type_id_fkey`;

-- DropForeignKey
ALTER TABLE `uploads` DROP FOREIGN KEY `uploads_user_id_fkey`;

-- DropTable
DROP TABLE `uploads`;

-- CreateTable
CREATE TABLE `sales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `product` VARCHAR(191) NOT NULL,
    `value` DOUBLE NOT NULL,
    `salesman` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sales` ADD CONSTRAINT `sales_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sales` ADD CONSTRAINT `sales_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
