const express = require('express');
const productsRouter = require('./routes/products');

const app = express();

app.use('/products', productsRouter);

app.use((req, res) => {
  res.sendStatus(404);
});

module.exports = app;
