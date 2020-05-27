const db = require('../database');

module.exports = {
  products: {
    getRelated(productId, callback) {
      const sql = `SELECT * FROM products WHERE category = (SELECT category FROM products WHERE productId = ${productId}`;
      db.query(sql, [productId, productId], (err, results) => {
        callback(err, results);
      });
    },
    addNew(params, callback = () => {}) {
      const sql = 'INSERT INTO products (name, price, prime, imageUrl, numReviews, avgRating) VALUES (?, ?, ?, ?, ?, ?)';
      // console.log(params);
      db.query(sql, [...params], (err, results) => {
        callback(err, results);
      });
    },
    getProduct(productId, callback) {
      const sql = 'SELECT * FROM products WHERE productId = ?';
      db.query(sql, productId, (err, results) => {
        callback(err, results);
      });
    },
    async updateProduct(productId, newProduct, callback) {
      const sql1 = 'DELETE FROM productcategories WHERE id_products = (SELECT id FROM products WHERE productId = ?)';
      await db.query(sql1, [productId], (err, results) => {
        // TODO: return both results from the final query
        if (err) {
          callback(err);
        }
      });
      const sql2 = 'REPLACE INTO products (productId, name, price, prime, imageUrl, numReviews, avgRating) VALUES (?, ?, ?, ?, ?, ?, ?)';
      db.query(sql2, [productId, ...newProduct], (err, results) => {
        callback(err, results);
      });
    },
    deleteProduct(productId, callback) {
      const sql = 'DELETE FROM products WHERE productId = ?';
      db.query(sql, productId, (err, results) => {
        callback(err, results);
      });
    },
  },
};
