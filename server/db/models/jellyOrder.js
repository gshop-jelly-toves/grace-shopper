const Sequelize = require('sequelize')
const db = require('../db')
const Order = require('./order')
const Jelly = require('./jelly')

const jellyOrder = db.define('jelly-orders', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  priceCents: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
})

jellyOrder.addItem = async function(orderId, jellyId) {
  try {
    // `findOrCreate` (oddly) returns an array containing a single
    // instance, so a little destructuring can be used
    const {[0]: item} = await jellyOrder.findOrCreate({
      where: {orderId, jellyId}
    })

    return await item.update({
      quantity: item.quantity + 1
    })
  } catch (e) {
    console.error(e)
  }
}

jellyOrder.removeItem = async function(orderId, jellyId) {
  try {
    let item = await jellyOrder.findOne({
      where: {
        jellyId,
        orderId
      }
    })

    if (item)
      item = await item.update({
        quantity: item.quantity - 1
      })

    return item
  } catch (e) {
    console.error(e)
  }
}

const rejectInvalidQuantity = item => {
  if (item.quantity < 1) item.destroy()
}

const setCartTotal = async item => {
  try {
    const items = await jellyOrder.findAll({
      where: {
        orderId: item.orderId
      }
    })
    const total = items.reduce((a, b) => a + b.priceCents * b.quantity, 0)

    // console.log(total)

    const cart = await Order.findOne({
      where: {
        id: item.orderId
      }
    })

    // console.log(cart)

    cart.update({
      cartTotal: total
    })
  } catch (e) {
    console.error(e)
  }
}

const savePrice = async item => {
  const jelly = await Jelly.findOne({
    where: {
      id: item.jellyId
    }
  })

  item.priceCents = jelly.dataValues.price

  return item
}

jellyOrder.afterUpdate(item => {
  rejectInvalidQuantity(item)
  setCartTotal(item)
})
jellyOrder.afterCreate(setCartTotal)
jellyOrder.beforeCreate(savePrice)

module.exports = jellyOrder
