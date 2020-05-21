const db = require('../database');

module.exports = {
  products: {
    getRelated(productId, callback) {
      const sql = 'SELECT DISTINCT p.* FROM products AS p LEFT OUTER JOIN productCategories AS pcj ON pcj.id_products = p.id WHERE pcj.id_categories IN (SELECT pcj.id_categories FROM productCategories AS pcj INNER JOIN products AS p ON p.id = pcj.id_products WHERE p.productId = ?) AND p.productId != ? LIMIT 50';
      db.query(sql, [productId, productId], (err, results) => {
        callback(err, results);
      });
    },
    addNew(params, callback = () => {}) {
      const sql = 'INSERT INTO products (productId, name, price, prime, imageUrl, numReviews, avgRating) VALUES (?, ?, ?, ?, ?, ?, ?)';
      // console.log(params);
      db.query(sql, params, (err, results) => {
        callback(err, results);
      });
    },
    // getProduct is not being used at present
    getProduct(productId, callback) {
      const sql = 'SELECT * FROM products WHERE productId = ?';
      db.query(sql, productId, (err, results) => {
        callback(err, results);
      });
    },
    async updateProduct(productId, newProduct, callback) {
      const sql1 = 'DELETE FROM productcategories WHERE id_products = (SELECT id FROM products WHERE productId = ?)';
      await db.query(sql1, [productId], (err, results) => {
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

  categories: {
    getAll(callback) {
      const sql = 'SELECT id FROM categories ORDER BY id ASC';
      db.query(sql, (err, results) => {
        callback(err, results);
      });
    },
    addNew(category, callback = () => {}) {
      const sql = 'INSERT INTO categories (name) VALUES (?)';

      db.query(sql, category, (err, results) => {
        callback(err, results);
      });
    },
  },

  productCategories: {
    addNew(params, callback = () => {}) {
      const sql = 'INSERT INTO productCategories (id_products, id_categories) VALUES (?, ?)';
      db.query(sql, params, (err, results) => {
        callback(err, results);
      });
    },
  },
};
