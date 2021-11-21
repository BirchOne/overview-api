require('dotenv').config();

const express = require('express');

const app = express();
const port = 3001;

const productsController = require('./controllers/products');

app.get('/products/', productsController.getMany);
app.get('/products/:product_id', productsController.getOne);
app.get('/products/:product_id/styles', productsController.getStyles);
app.get('/products/:product_id/related', productsController.getRelated);

app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(port);

module.exports = app;
