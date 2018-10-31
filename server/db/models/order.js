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
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0
  },
  orderTotal: {
    type: Sequelize.DECIMAL(10, 2)
  }
})

const setCartTotal = async order => {
  const items = await Jelly.findAll({
    where: {
      orderId: order.id
    }
  })
  const total = items.reduce((a, b) => a + b.price, 0)
  order.cartTotal = total
}

Order.beforeUpdate(setCartTotal)

module.exports = Order
