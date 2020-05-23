CREATE TABLE IF NOT EXISTS products (
  productId int,
  name text,
  price decimal,
  prime int,
  imageUrl text,
  numReviews int,
  avgRating float,
  category text.
);

CREATE TABLE IF NOT EXISTS products ("productId" int, name text, price decimal, prime int, "imageUrl" text, "numReviews" int, "avgRating" float, category text, PRIMARY KEY ("productId", category)) WITH CLUSTERING ORDER BY (category ASC);

dsbulk load --schema.keyspace related_items --schema.table products --connector.csv.url "/users/benjaminbarnett/Documents/Hack Reactor/sdc/rainforest-related-items.csv"