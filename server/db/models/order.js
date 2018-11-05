const Sequelize = require('sequelize')
const db = require('../db')
const JellyOrder = require('./jellyOrder')

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

const JellyOrder = require('./jellyOrder')
  
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

Order.prototype.updatePrices = async function() {
  if (this.status === 'cart') {
    try {
      const jellyOrders = await JellyOrder.findAll(
        {where: {orderId: this.id}}
      )

      jellyOrders.forEach(async item => await item.updatePrice())
    } catch(e) { console.error(e) }
  } else {
    throw new Error('only orders with status cart can be updated')
  }
}

Order.prototype.checkout = async function() {
  if (this.status === 'cart') {

    const dummyTaxesAndShipping = total => total*1.337

    await this.updatePrices()
    this.orderTotal = dummyTaxesAndShipping(this.cartTotal)
    this.status = 'processing'
    // todo..

  } else {
    throw new Error('only orders with status cart can be checked out')
  }
}


const forceOneCart = async order => {
  if (order.status === 'cart') {
    try {
      const { userId } = order.dataValues
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

Order.beforeCreate(forceOneCart)

module.exports = Order
