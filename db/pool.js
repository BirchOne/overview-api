const { Pool } = require('pg');

const pool = new Pool({
  max: 20,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  allowExitOnIdle: true,
});

module.exports = pool;
