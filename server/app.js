const express = require('express');
const productsController = require('./controllers/products');

const app = express();

app.get('/products/', productsController.getMany);
app.get('/products/:product_id', productsController.getOne);
app.get('/products/:product_id/styles', productsController.getStyles);
app.get('/products/:product_id/related', productsController.getRelated);

app.use((req, res) => {
  res.sendStatus(404);
});

module.exports = app;
