const User = require('./user')
const Jelly = require('./jelly')
const Review = require('./review')
const Order = require('./order')
const Category = require('./category')
const JellyOrder = require('./jellyOrder')

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

Jelly.belongsToMany(Order, {
  through: {model: JellyOrder, unique: false},
  constraints: false
})
Order.belongsToMany(Jelly, {
  through: {model: JellyOrder, unique: false},
  constraints: false
})

/* On Order - userId */
Order.belongsTo(User)
User.hasMany(Order)

/* On Review - JellyId */
Review.belongsTo(Jelly)
Jelly.hasMany(Review)

/* On Review - userId */
Review.belongsTo(User)
User.hasMany(Review)

Jelly.belongsToMany(Category, {through: 'jelly_category'})
Category.belongsToMany(Jelly, {through: 'jelly_category'})

module.exports = {
  User,
  Jelly,
  Review,
  Order,
  Category,
  JellyOrder
}
