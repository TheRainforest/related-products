-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

DROP DATABASE IF EXISTS `related_products`;
CREATE DATABASE `related_products`;
USE `related_products`;

-- ---
-- Table 'products'
--
-- ---

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` INT(11) AUTO_INCREMENT PRIMARY KEY,
  `productId` INT(11) UNIQUE,
  `name` VARCHAR(40),
  `price` DECIMAL(7, 2),
  `prime` TINYINT,
  `imageUrl` VARCHAR(255),
  `numReviews` INT(11),
  `avgRating` FLOAT(2)
);

-- ---
-- Table 'categories'
--
-- ---

DROP TABLE IF EXISTS `categories`;

CREATE TABLE `categories` (
  `id` INT(11) AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(30) UNIQUE
);

-- ---
-- Table 'productCategories'
--
-- ---

DROP TABLE IF EXISTS `productCategories`;

CREATE TABLE `productCategories` (
  `id` INT(11) AUTO_INCREMENT PRIMARY KEY,
  `id_products` INT(11),
  `id_categories` INT(11)
);

-- ---
-- Table 'feedback'
--
-- ---

DROP TABLE IF EXISTS `feedback`;

CREATE TABLE `feedback` (
  `id` INT(11) AUTO_INCREMENT PRIMARY KEY,
  `type` ENUM('unrelated', 'inappropriate', 'other'),
  `comment` VARCHAR(255),
  `id_productCategories` INT(11)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `productCategories` ADD FOREIGN KEY (id_products) REFERENCES `products` (`id`);
ALTER TABLE `productCategories` ADD FOREIGN KEY (id_categories) REFERENCES `categories` (`id`);
ALTER TABLE `feedback` ADD FOREIGN KEY (id_productCategories) REFERENCES `productCategories` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `products` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `categories` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `productCategories` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `feedback` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `products` (`id`,`productId`,`name`,`price`,`prime`,`imageUrl`,`numReviews`,`avgRating`) VALUES
-- ('','','','','','','','');
-- INSERT INTO `categories` (`id`,`name`) VALUES
-- ('','');
-- INSERT INTO `productCategories` (`id`,`id_products`,`id_categories`) VALUES
-- ('','','');
-- INSERT INTO `feedback` (`id`,`type`,`comment`,`id_productCategories`) VALUES
-- ('','','','');