
DROP DATABASE IF EXISTS `related_products`;
CREATE DATABASE `related_products`;
USE `related_products`;

-- ---
-- Table 'products'
--
-- ---

DROP TABLE IF EXISTS `products`;

CREATE TABLE products (
  "productId" SERIAL PRIMARY KEY,
  name text NOT NULL,
  price NUMERIC(7,2) NOT NULL,
  prime BOOLEAN NOT NULL,
  "imageUrl" VARCHAR(255) NOT NULL,
  "numReviews" INT NOT NULL,
  "avgRating" NUMERIC(2, 1) NOT NULL,
  category INT NOT NULL
);


copy products(name, price, prime, "imageUrl, numReviews, avgRating, category) from '../postgres-rainforest-related-items.csv' DELIMITER ',' CSV HEADER;
