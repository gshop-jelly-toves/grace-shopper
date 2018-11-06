const Sequelize = require('sequelize')
const db = require('../db')
console.log(db.models)
const Order = db.models.order
const Jelly = db.models.jelly

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

jellyOrder.setQuantity = async function(orderId, jellyId, amount) {
  try {

    const {[0]: item} = await this.findOrCreate({
      where: {orderId, jellyId}
    })

    return await item.update({
      quantity: amount
    })
  } catch (e) {
    console.error(e)
  }
}

jellyOrder.addItem = async function(orderId, jellyId) {
  try {
    // `findOrCreate` (oddly) returns an array containing a single
    // instance, so a little destructuring can be used

    const {[0]: item} = await this.findOrCreate({
      where: {orderId, jellyId}
    })

    return await item.update({
      quantity: item.dataValues.quantity + 1
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
        quantity: item.dataValues.quantity - 1
      })

    return item
  } catch (e) {
    console.error(e)
  }
}

jellyOrder.prototype.updatePrice = async function() {
  const jelly = await Jelly.findOne({
    where: {id: this.jellyId}
  })
  const item = await this.update({priceCents: jelly.dataValues.priceCents})
  return item
}

const rejectInvalidQuantity = item => {
  if (item.quantity < 1) item.destroy()
}

const setCartTotal = async item => {
  try {
    const items = await jellyOrder.findAll({
      where: {orderId: item.orderId}
    })

    const total = items.reduce((a, b) => a + b.priceCents * b.quantity, 0)

    const cart = await Order.findOne({
      where: {id: item.orderId}
    })

    cart.update({
      cartTotal: total
    })
    return item
  } catch (e) {
    console.error(e)
  }
}

const savePrice = item => {
  item.updatePrice()
  return item
}

jellyOrder.afterUpdate(async item => {
  item = await savePrice(item)
  item = setCartTotal(item)
  rejectInvalidQuantity(item)
  return item
})

jellyOrder.afterCreate(async item => {
  item = await savePrice(item)
  setCartTotal(item)
})
jellyOrder.afterDestroy(item => {
  setCartTotal(item)
  return item
})
// jellyOrder.afterDestroy(async item => {
//   item = await setCartTotal(item)
//   return item
// })

module.exports = jellyOrder
