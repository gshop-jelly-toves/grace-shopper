const Sequelize = require('sequelize')
const db = require('../db')
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

jellyOrder.setItem = async function(orderId, jellyId, quantity) {
  try {

    const {[0]: item} = await this.findOrCreate({
      where: {orderId, jellyId}
    })

    return item.update({quantity})
  } catch (e) {
    console.error(e)
  }
}

jellyOrder.decrementJelly = async function(orderId, jellyId) {
  try {

    const item = await this.findOne({
      where: {orderId, jellyId}
    })

    return await item.update({
      quantity: item.quantity - 1
    })
  } catch (e) {
    console.error(e)
  }
}

jellyOrder.addItem = async function(orderId, jellyId, quantity) {
  try {
    const {[0]: item} = await this.findOrCreate({
      where: {orderId, jellyId}
    })

    let oldQuantity = item.dataValues.quantity
    let newQuantity = oldQuantity + parseInt(quantity)

    return await item.update({
      quantity: newQuantity
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
      item.destroy()

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
  if (item.dataValues.quantity < 1) item.destroy()
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
  item = await setCartTotal(item)
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
