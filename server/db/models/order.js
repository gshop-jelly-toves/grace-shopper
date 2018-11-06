const Sequelize = require('sequelize')
const db = require('../db')
const { dummyTaxesAndShipping } = require('../../utils')

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

    try {
      await this.updatePrices()
      console.log('can anyone hear me')
      return await this.update({
        orderTotal: dummyTaxesAndShipping(this.cartTotal),
        status: 'created'
      })
    } catch(e) { console.error(e) }

  } else {
    throw new Error('only orders with status cart can be checked out')
  }
}


const forceOneCart = async order => {

  if (order.dataValues.status === 'cart') {
    try {
      const { userId } = order.dataValues
      // console.log('userid',userId)

      const existingCart = await Order.findAll({
        where: {userId, status: 'cart'}
      })
      // console.log('cart',existingCart)
      if (existingCart)
        throw new Error(`User (id: ${userId}) can only have one cart.`)
    } catch (e) {
      console.error(e)
    }
  }
  return order
}

Order.beforeCreate( async order => {
  order = await forceOneCart(order)
  return order
})

module.exports = Order
