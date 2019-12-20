//routes/index.js

const express = require('express');
const router = express.Router();

// zdefiniowanie odpowiedzi dla "strony głównej"
router.get('/', (req, res) => {
    res.json({'':'working!'});
});

module.exports = router;
