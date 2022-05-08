const express = require('express')
const productController = require('../controllers/productController')

const router = express.Router();

router.route('/').post(productController.createProduct) // .../products/
router.route('/').get(productController.getAllProducts)
router.route('/:slug').get(productController.getProduct);

module.exports = router;