const crypto = require('crypto')
const Sequelize = require('sequelize')
const { Op } = Sequelize
const db = require('../db')
const JellyOrder = require('./jellyOrder')
const Order = require('./order')
const Jelly = require('./jelly')

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  avatar: {
    type: Sequelize.STRING,
    defaultValue:
      'https://thesocietypages.org/socimages/files/2009/05/nopic_192.gif'
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    isEmail: true
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  },
  role: {
    // ENUM lets you define preset values for a field
    type: Sequelize.ENUM,
    // seller may be a bit ambitious for the scope of this
    // project. dev is included to grant a higher access
    // level than those who become admins later on
    values: ['user', 'seller', 'admin', 'dev'],
    defaultValue: 'user'
  }
})

module.exports = User

/**
 * instanceMethods
 */

User.prototype.deserializeCart = async function() {
  try {
    const cart = await Order.findOrCreateCartByUserId(this.id)
    const jellyOrders = await JellyOrder.findAll(
      {where: {orderId: cart.id}}
    )
    // const jellyIds = jellyOrders.map(item => ({id: item.jellyId}) )
    // const jellys = await Jelly.findAll({
    //   where: {
    //     [Op.or]: jellyIds
    //   }
    // })
    // console.log(jellys)
    // return jellys
    // console.log('CART', cart)

    return {
      ...cart.dataValues,
      items: Object.keys(jellyOrders)
        .reduce( (obj, key) => {
          obj[ jellyOrders[key].dataValues.jellyId ] = jellyOrders[key].dataValues
          return obj
        }, {})
    }
  } catch (e) { console.error(e) }
}

User.prototype.destroyActiveCart = async function() {
  try {
    const cart = await Order.findOrCreateCartByUserId(this.id)
    const jellyOrders = await JellyOrder.findAll(
      {where: {orderId: cart.id}}
    )

    jellyOrders.forEach(async item => await item.destroy())


  } catch (e) { console.error(e) }
}


// can be used to check a users role and
// choose which features they have access to
// see /server/middlewares/user
User.prototype.getAccessLevel = function() {
  switch (this.role) {
    case 'user':
      return 1
    case 'seller':
      return 2
    case 'admin':
      return 3
    case 'dev':
      return 4
    default:
      return 0
  }
}

User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
