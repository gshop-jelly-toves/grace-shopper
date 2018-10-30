const User = require('./user')
const Product = require('./product')
const Review = require('./review')
const Order = require('./orders')
const Category = require('./category')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Product.belongsToMany(Order, {through: 'product-order'})
Order.hasMany(Product)
Order.belongsTo(User)
User.hasMany(Order)
Review.belongsTo(Product)
Review.belongsTo(User)
User.hasMany(Review)
Category.hasMany(Product)
Product.belongsTo(Category)

module.exports = {
  User,
  Product,
  Review,
  Order,
  Category
}
