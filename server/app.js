require('dotenv').config();

const express = require('express');
const { Client } = require('pg');

const app = express();
const port = 3001;

// route to get many products
app.get('/products/?', async (req, res) => {
  const page = req.query.page || 1;
  const count = req.query.count || 5;

  const client = new Client({
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  try {
    await client.connect();

    const products = await client.query(
      `
        SELECT *
        FROM products
        WHERE id >= ${(page - 1) * count + 1} AND id <= ${page * count}
      `,
    );

    await client.end();

    res.send(products.rows);
  } catch (err) {
    res.sendStatus(500);
  }
});

// route to get one product
app.get('/products/:product_id', async (req, res) => {
  const id = req.params.product_id;

  const client = new Client({
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  try {
    await client.connect();

    const products = await client.query(
      `
        SELECT *,
        (
          SELECT json_agg(x) FROM (
            SELECT feature, value FROM features WHERE product_id = ${id}
          ) x
        ) features
        FROM products WHERE id = ${id}
      `,
    );

    await client.end();

    res.send(products.rows[0]);
  } catch (err) {
    res.sendStatus(500);
  }
});

// route to get styles
app.get('/products/:product_id/styles', async (req, res) => {
  const id = req.params.product_id;

  const client = new Client({
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  try {
    await client.connect();

    const products = await client.query(
      `
        SELECT *,
        (
          SELECT json_agg(x) FROM (
            SELECT * FROM photos WHERE style_id = styles.id
          ) x
        ) photos,
        (
          SELECT json_agg(x) FROM (
            SELECT * FROM skus WHERE style_id = styles.id
          ) x
        ) skus
        FROM styles WHERE product_id = ${id}
      `,
    );

    await client.end();

    // transform the data before sending it back to the client
    res.send(products.rows);
  } catch (err) {
    res.sendStatus(500);
  }
});

// route to get related items
app.get('/products/:product_id/related', async (req, res) => {
  const id = req.params.product_id;

  const client = new Client({
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  try {
    await client.connect();

    const products = await client.query(
      `
        SELECT related_id
        FROM related
        WHERE product_id = ${id}
      `,
    );

    await client.end();

    // transform the data before sending it back to the client
    res.send(products.rows);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.listen(port);
