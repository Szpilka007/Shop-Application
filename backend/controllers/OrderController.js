const Order = require('../models/order');

exports.getAll = (req, res) => {
    Order.getAll().then(
        function (allOrders) {
            res.json(allOrders);
        }
    );
};

exports.getById = (req, res) => {
    Order.getById(req.params.id).then(
        function (order) {
            res.json(order);
        }
    );
};

exports.store = (req, res) => {
    const newOrder = Order.create({
        'acceptDate': req.body.acceptDate,
        'orderStatus': req.body.orderStatus,
        'userName': req.body.userName,
        'email': req.body.email,
        'phoneNumber': req.body.phoneNumber,
        'productList': JSON.stringify(req.body.productList)
    }).then(function () {
        res.json({
            'status': 'saved!',
            'product': newOrder,
        });
    }).catch(err => {
        res.json({
            'status': 'Order has not been created',
            'message:': err
        });
    })
};

exports.updateById = (req, res) => {

    Order.update(req.body.order).then(
        function (order) {
            res.json(order);
        }
    ).catch(err => {
        res.json({
            'status': 'Order has not been updated',
            'message:': err
        });
    })
};
