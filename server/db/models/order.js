const Sequelize = require('sequelize')
const Jelly = require('./jelly')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM(
      'created',
      'processing',
      'cancelled',
      'shipped',
      'delivered',
      'cart'
    ),
    allowNull: false,
    defaultValue: 'cart'
  },
  cartTotal: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  orderTotal: {
    type: Sequelize.INTEGER
  }
})

Order.findOrCreateCartByUserId = async function(userId) {
  try {
    let cart = await this.findOne({where: {userId, status: 'cart'}})
    if (!cart)
      cart = await this.create({
        status: 'cart',
        userId
      })
    return cart
  } catch (e) {
    console.error(e)
  }
}

const forceOneCart = async order => {
  if (order.status === 'cart') {
    try {
      const {userId} = order.dataValues
      const existingCart = await Order.findOne({
        where: {userId, status: 'cart'}
      })
      if (existingCart)
        throw new Error(`User (id: ${userId}) can only have one cart.`)
    } catch (e) {
      console.error(e)
    }
  }
}

const setCartTotal = async order => {
  try {
    const items = await Jelly.findAll({
      where: {
        orderId: order.id
      }
    })
    const total = items.reduce((a, b) => a + b.price, 0)
    order.cartTotal = total
  } catch (e) {
    console.error(e)
  }
}

Order.beforeCreate(forceOneCart)
Order.beforeUpdate(setCartTotal)

module.exports = Order
