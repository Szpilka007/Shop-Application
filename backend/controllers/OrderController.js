const Order = require('../models/order');

exports.getAll = (req, res) => {
    Order.getAll().then(
        function(allOrders) {
            res.json(allOrders);
        }
    );
};

exports.getById = (req, res) => {
    Order.getById(req.params.id).then(
        function(order) {
            res.json(order);
        }
    );
};

exports.store = (req, res) => {
    const newOrder = Order.create({
        'acceptdate': req.body.acceptdate,
        'orderstatus': req.body.orderstatus,
        'username': req.body.username,
        'email': req.body.email,
        'phonenumber': req.body.phonenumber,
        'productlist': req.body.productlist
    }).then(function() {
        res.json({
            'status':'saved!',
            'product': newOrder,
        });
    });
};

exports.updateById = (req, res) => {
    Order.update(req.body.order).then(
        function(order) {
            res.json(order);
        }
    )
};
