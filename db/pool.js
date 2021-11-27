const { Pool } = require('pg');

const pool = new Pool({
  max: 20,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  allowExitOnIdle: true,
});

module.exports = pool;
