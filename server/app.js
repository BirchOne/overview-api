require('dotenv').config();

const express = require('express');
const { Client } = require('pg');

const app = express();
const port = 3001;

// route to get many products
app.get('/products/?', async (req, res) => {
  const page = req.query.page || 1;
  const count = req.query.count || 5;

  const query = `
    SELECT *
    FROM products
    WHERE id >= ${(page - 1) * count + 1} AND id <= ${page * count}
  `;

  const client = new Client({
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  try {
    await client.connect();

    const result = await client.query(query);

    await client.end();

    res.send(result.rows);
  } catch (err) {
    res.sendStatus(500);
  }
});

// route to get one product
app.get('/products/:product_id', async (req, res) => {
  const id = req.params.product_id;

  const query = `
    SELECT *,
    (
      SELECT json_agg(x) FROM (
        SELECT feature, value FROM features WHERE product_id = ${id}
      ) x
    ) features
    FROM products WHERE id = ${id}
  `;

  const client = new Client({
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  try {
    await client.connect();

    const result = await client.query(query);

    await client.end();

    res.send(result.rows[0]);
  } catch (err) {
    res.sendStatus(500);
  }
});

// route to get styles
app.get('/products/:product_id/styles', async (req, res) => {
  const id = req.params.product_id;

  const query = `
    SELECT id as style_id, name, original_price, sale_price, default_style as "default?",
    (
      SELECT json_agg(x) FROM (
        SELECT thumbnail_url, url FROM photos WHERE style_id = styles.id
      ) x
    ) photos,
    (
      SELECT json_object_agg(id, x) FROM (
        SELECT id, quantity, size FROM skus WHERE style_id = styles.id
      ) as x
    ) skus
    FROM styles WHERE product_id = ${id}
  `;

  const client = new Client({
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  try {
    await client.connect();

    const result = await client.query(query);

    await client.end();

    const data = {
      product_id: id,
      results: result.rows,
    };

    res.send(data);
  } catch (err) {
    res.sendStatus(500);
  }
});

// route to get related items
app.get('/products/:product_id/related', async (req, res) => {
  const id = req.params.product_id;

  const query = `
    SELECT related_id
    FROM related
    WHERE product_id = ${id}
  `;

  const client = new Client({
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  try {
    await client.connect();

    const result = await client.query(query);

    await client.end();

    const data = result.rows.map((item) => item.related_id);

    res.send(data);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.listen(port);
