const db = require('../database');

module.exports = {
  products: {
    getRelated(productId, callback) {
      db`
        SELECT * FROM products WHERE category = (SELECT category FROM products WHERE "productId" = ${productId})
      `
        .then((results) => {
          callback(null, results);
        },
        (err) => {
	  console.log('getRelated:', err);
          callback(err);
        });
    },
    getProduct(productId, callback) {
      db`
        SELECT * FROM products WHERE "productId" = ${productId};
      `
        .then((results) => {
          callback(null, results);
        },
        (err) => {
          callback(err);
        });
    },
    addNew(product, callback = () => {}) {
      const {
        name, price, prime, imageUrl, numReviews, avgRating,
      } = product;
      db`
        INSERT INTO products ("productId", name, price, prime, "imageUrl", "numReviews", "avgRating", category)
        VALUES (default, ${name}, ${price}, ${prime}, ${imageUrl}, ${numReviews}, ${avgRating}, 400000);
      `
        .then(
          (confirmation) => callback(null, confirmation),
          (err) => {
            callback(err);
          },
        );
    },
    updateProduct(productId, newProduct, callback) {
      db`
        REPLACE INTO products ("productId", name, price, prime, "imageUrl", "numReviews", "avgRating")
        VALUES (${[...newProduct]});
      `
        .then((confirmation) => {
          callback(null, confirmation);
        },
        (err) => {
          callback(err);
        });
    },
    deleteProduct(productId, callback) {
      db`
        DELETE FROM products WHERE productId = ${productId};
      `
        .then((confirmation) => {
          callback(null, confirmation);
        },
        (err) => {
          callback(err);
        });
    },
  },
};
