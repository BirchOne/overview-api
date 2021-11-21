const { Client } = require('pg');

const queryDB = async (query) => {
  try {
    const client = new Client({
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    });

    await client.connect();

    const result = await client.query(query);

    await client.end();

    return result;
  } catch (err) {
    throw new Error('Database Error');
  }
};

module.exports = queryDB;
