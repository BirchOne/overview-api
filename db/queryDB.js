const { Client } = require('pg');

const queryDB = async (query) => {
  const client = new Client({
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  try {
    await client.connect();
    const result = await client.query(query);
    await client.end();

    return result;
  } catch (err) {
    await client.end();

    throw new Error('Database Error');
  }
};

module.exports = queryDB;
