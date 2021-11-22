const express = require('express');
const productsController = require('../controllers/productController');

const router = express.Router();

router.get('/', productsController.getMany);
router.get('/:product_id', productsController.getOne);
router.get('/:product_id/styles', productsController.getStyles);
router.get('/:product_id/related', productsController.getRelated);

module.exports = router;
