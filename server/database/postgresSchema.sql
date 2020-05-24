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

CREATE SCHEMA products
  CREATE TABLE products (
    productId SERIAL PRIMARY KEY,
    name text NOT NULL,
    price SMALLINT NOT NULL,
    prime BOOLEAN NOT NULL,
    imageUrl VARCHAR(255) NOT NULL,
    numReviews SMALLINT NOT NULL,
    avgRating NUMERIC(2, 1) NOT NULL,
    category INT UNIQUE NOT NULL
  );

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `products` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `products` (`id`,`productId`,`name`,`price`,`prime`,`imageUrl`,`numReviews`,`avgRating`, `category`) VALUES
-- ('','','','','','','','');