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

jellyOrder.addItem = async function(orderId, jellyId) {
  try {
    // `findOrCreate` (oddly) returns an array containing a single
    // instance, so a little destructuring can be used
    console.log('info',orderId, jellyId)

    const item = await this.findOrCreate({
      where: {orderId, jellyId}
    })

    console.log('item', item[0])

    return await item[0].update({
      quantity: item[0].quantity + 1
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

jellyOrder.prototype.updatePrice = async function() {
  const jelly = await Jelly.findOne({
    where: {id: this.jellyId}
  })
  this.update({priceCents: jelly.priceCents})
}

const rejectInvalidQuantity = item => {
  if (item.quantity < 1) item.destroy()
  return item
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

const savePrice = async item => {
  await item.updatePrice()
  return item
}

jellyOrder.afterUpdate(item => {
  rejectInvalidQuantity(item)
  setCartTotal(item)
  savePrice(item)
  return item
})
jellyOrder.afterCreate(setCartTotal)
jellyOrder.afterDestroy(setCartTotal)
jellyOrder.beforeCreate(savePrice)

module.exports = jellyOrder
