//product.js
const bookshelf= require('../config/bookshelf');

const Order = bookshelf.Model.extend({
    tableName: 'order'
});

module.exports.getAll = () => {
    return Order.fetchAll();
};

module.exports.getById = (id) => {
    return new Order({'id':id}).fetch();
};

module.exports.create = (order) => {
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
    return new Order({
        id: order.id
    }).save( {
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
