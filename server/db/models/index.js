const User = require('./user')
const Jelly = require('./jellys')
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


Order.hasMany(Jelly)
Jelly.belongsToMany(Order, {through: 'jelly-order'})

/* On Order - userId */
Order.belongsTo(User)
User.hasMany(Order)

/* On Review - JellyId */
Review.belongsTo(Jelly)
Jelly.hasMany(Review)

/* On Review - userId */
Review.belongsTo(User)
User.hasMany(Review)
Category.hasMany(Jelly)
Jelly.belongsTo(Category)

module.exports = {
  User,
  Jelly,
  Review,
  Order,
  Category
}
