//routes/index.js

const express = require('express');
const router = express.Router();
const IndexController = require('../controllers/IndexController');
const ProductsContorller = require('../controllers/ProductsController');

// zdefiniowanie odpowiedzi dla "strony głównej"
router.get('/', IndexController.home);

// zdefiniowie odpowiedzi dla produktów
router.get('/products', ProductsContorller.getAll);
router.get('/products/:id', ProductsContorller.getById);
router.post('/products', ProductsContorller.store);
router.put('/products/:id', ProductsContorller.updateById);

module.exports = router;
