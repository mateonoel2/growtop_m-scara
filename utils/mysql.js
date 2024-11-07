const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.example' });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

module.exports = pool;