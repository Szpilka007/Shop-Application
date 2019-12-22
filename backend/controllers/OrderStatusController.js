const OrderStatus = require('../models/orderStatus');

exports.getAll = (req, res) => {
    OrderStatus.getAll().then(
        function(allProducts) {
            res.json(allProducts);
        }
    );
};
