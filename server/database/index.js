require('dotenv').config();
const postgres = require('postgres');

const db = postgres({
  max: 100,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  transform: {
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
