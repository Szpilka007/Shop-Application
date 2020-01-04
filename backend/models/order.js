//product.js
const bookshelf = require('../config/bookshelf');

const Product = bookshelf.Model.extend({
    tableName: 'Products'
})

const Order = bookshelf.Model.extend({
    tableName: 'order'
});

module.exports.getAll = () => {
    return Order.fetchAll();
};

module.exports.getById = (id) => {
    return new Order({'id': id}).fetch();
};

module.exports.create = (order) => {
    if (order.userName.length < 1)
        throw 'Wrong user name';
    if (!Number.isInteger(order.phoneNumber))
        throw 'Uncorrected phone number';

    const productList = JSON.parse(order.productList);
    for (let i = 0; i < productList.length; i++) {
        if (productList[i].amount < 1)
            throw 'Uncorrected amount of products';
        if (!Number.isInteger(productList[i].amount))
            throw 'Amount of products must be a number';
        if (Product({'id': productList[i].product.id}).fetch().isNull())
            throw 'There is no product with given id in database'
    }
    return new Order({
        acceptDate: order.acceptDate,
        orderStatus: order.orderStatus,
        userName: order.userName,
        email: order.email,
        phoneNumber: order.phoneNumber,
        productList: order.productList
    }).save();
};

module.exports.update = (order) => {
    Order({'id': id}).fetch().then(orderFromDatabase => {
        if (orderFromDatabase.isNull())
            throw 'There is no object with given id';
        if (orderFromDatabase.orderStatus === 'Canceled')
            throw 'The order was canceled';
        if (orderFromDatabase.orderStatus === 'Completed')
            throw 'The order was completed';
    });
    return new Order({
        id: order.id
    }).save({
            acceptDate: order.acceptDate,
            orderStatus: order.orderStatus,
            username: order.userName,
            email: order.email,
            phoneNumber: order.phoneNumber,
            productList: order.productList
        },
        {patch: true}
    );

};
