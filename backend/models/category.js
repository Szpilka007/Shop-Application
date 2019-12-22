const bookshelf= require('../config/bookshelf');

const Category = bookshelf.Model.extend({
    tableName: 'category'
});

module.exports.getAll = () => {
    return Category.fetchAll();
};
