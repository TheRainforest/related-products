require('dotenv').config();
const postgres = require('postgres');

const db = postgres({
  max: 10,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  transform: {
    // column(item) {
    //   if (item === 'productid') {
    //     return 'productId';
    //   }
    //   if (item === 'imageurl') {
    //     return 'imageUrl';
    //   }
    //   if (item === 'numreviews') {
    //     return 'numReviews';
    //   }
    //   if (item === 'avgrating') {
    //     return 'avgRating';
    //   }
    //   return item;
    // },
    value(item) {
      if (item === true) {
        return 1;
      }
      if (item === false) {
        return 0;
      }
      return item;
    },
  },
});

module.exports = db;
