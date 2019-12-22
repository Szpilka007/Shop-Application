//routes/index.js

const express = require('express');
const router = express.Router();
const IndexController = require('../controllers/IndexController');
const ProductContorller = require('../controllers/ProductController');
const CategoryController = require('../controllers/CategoryController');
const OrderStatusController = require('../controllers/OrderStatusController');
const OrderController = require('../controllers/OrderController');
const app = require('../app');

// zdefiniowanie odpowiedzi dla "strony głównej"
router.get('/', IndexController.home);


// zdefiniowie odpowiedzi dla produktów
router.get('/products', ProductContorller.getAll);
router.get('/products/:id', ProductContorller.getById);
router.post('/products', ProductContorller.store);
router.put('/products', ProductContorller.updateById);

// zdefiniowanie odpowiedzi dla kategori
router.get('/categories', CategoryController.getAll);

// zdefiniowanie odpowiedzi dla statusów zamówień
router.get('/status', OrderStatusController.getAll);

// zdefiniowanie odpowiedzi dla zamówień
router.get('/orders',OrderController.getAll);
router.get('orders/:id', ProductContorller.getById);
router.post('/orders', ProductContorller.store);
router.put('/orders', ProductContorller.updateById);

module.exports = router;
