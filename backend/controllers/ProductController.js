const Product = require('../models/product');

exports.getAll = (req, res) => {
    Product.getAll().then(
        function(allProducts) {
            res.json(allProducts);
        }
    );
};

exports.getById = (req, res) => {
    Product.getById(req.params.id).then(
        function(product) {
            res.json(product);
        }
    );
};

exports.store = (req, res) => {
    const newProduct = Product.create({
        'name': req.body.name,
        'description': req.body.description,
        'price': req.body.price,
        'amount': req.body.amount,
    }).then(function() {
        res.json({
            'status':'saved!',
            'product': newProduct,
        });
    });
};

exports.updateById = (req, res) => {
    Product.update(req.body.product).then(
        function(product) {
            res.json(product);
        }
    )
};
