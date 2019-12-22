//product.js
const bookshelf= require('../config/bookshelf');

const Order = bookshelf.Model.extend({
    tableName: 'Order'
})

module.exports.getAll = () => {
    return Order.fetchAll();
}

module.exports.getById = (id) => {
    return new Order({'id':id}).fetch();
}

module.exports.create = (order) => {
    return new Order({
        acceptdate: order.acceptdate,
        orderstatus: order.orderstatus,
        username: order.username,
        email: order.email,
        phonenumber: order.phonenumber,
        productlist: order.productlist
    }).save();
};

module.exports.update = (order) => {
    return new Order({
        id: order.id
    }).save( {
            acceptdate: order.acceptdate,
            orderstatus: order.orderstatus,
            username: order.username,
            email: order.email,
            phonenumber: order.phonenumber,
            productlist: order.productlist
        },
        {patch: true}
    );
}
