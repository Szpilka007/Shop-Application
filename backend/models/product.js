//product.js
const bookshelf = require('../config/bookshelf');

const Product = bookshelf.Model.extend({
    tableName: 'Products'
})

module.exports.getAll = () => {
    return Product.fetchAll();
}

module.exports.getById = (id) => {
    return new Product({'id': id}).fetch();
}

module.exports.create = (product) => {
    if (product.name === '' || product.description === '' || product.price <= 0 || product.amount <= 0)
        throw 'The product have a wrong attribute';
    return new Product({
        name: product.name,
        description: product.description,
        price: product.price,
        amount: product.amount
    }).save();
};

module.exports.update = (product) => {
    if (product.name.length < 1 || product.description.length < 1 || product.price <= 0 || product.amount <= 0)
        throw 'Wrong attribute';
    if (Product({'id': product.id}).fetch().isNull())
        throw 'There is no product with given id';
    return new Product({
        id: product.id
    }).save({
            name: product.name,
            description: product.description,
            price: product.price,
            amount: product.amount
        },
        {patch: true}
    );
}
