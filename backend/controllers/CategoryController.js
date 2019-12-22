const Category = require('../models/category');

exports.getAll = (req, res) => {
    Category.getAll().then(
        function(allProducts) {
            res.json(allProducts);
        }
    );
};
