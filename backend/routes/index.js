//routes/index.js

const express = require('express');
const router = express.Router();
const IndexController = require('../controllers/IndexController');
const ProductContorller = require('../controllers/ProductController');
const app = require('../app');

// zdefiniowanie odpowiedzi dla "strony głównej"
router.get('/', IndexController.home);


// zdefiniowie odpowiedzi dla produktów
router.get('/products', ProductContorller.getAll);
router.get('/products/:id', ProductContorller.getById);
router.post('/products', ProductContorller.store);
router.put('/products', ProductContorller.updateById);

module.exports = router;
