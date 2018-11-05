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
    // console.log('info',orderId, jellyId)

    const {[0]: item} = await this.findOrCreate({
      where: {orderId, jellyId}
    })

    // console.log('item', item[0])

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
    where: {id: this.dataValues.jellyId}
  })
  this.update({priceCents: jelly.dataValues.priceCents})
}

const rejectInvalidQuantity = item => {
  if (item.quantity < 1) item.destroy()
  return item
}

const setCartTotal = async item => {
  try {
    const items = await jellyOrder.findAll({
      where: {orderId: item.dataValues.orderId}
    })

    // console.log('123456789', item.dataValues.orderId)

    const total = items.reduce((a, b) => a + b.dataValues.priceCents * b.dataValues.quantity, 0)

    const cart = await Order.findOne({
      where: {id: item.dataValues.orderId}
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
jellyOrder.beforeCreate(item => {
  savePrice(item)
  return item
})

jellyOrder.afterCreate(item => {
  setCartTotal(item)
  return item
})
jellyOrder.afterDestroy(item => {
  setCartTotal(item)
  return item
})

module.exports = jellyOrder
