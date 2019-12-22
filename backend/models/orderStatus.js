const bookshelf= require('../config/bookshelf');

const OrderStatus = bookshelf.Model.extend({
    tableName: 'orderstatus'
});

module.exports.getAll = () => {
    return OrderStatus.fetchAll();
};
