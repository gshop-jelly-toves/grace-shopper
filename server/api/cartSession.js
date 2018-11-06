const { Jelly, JellyOrder, Order } = require('../db/models')
const { dummyTaxesAndShipping } = require('../utils')

const newJelly = jelly => ({
  jellyId: jelly.id,
  priceCents: jelly.priceCents,
  quantity: 1
})

module.exports = {
  /*
    these functions assume cart is an identical
    datastructure to the result of model User.deserializeCart
    ex.
      jellies: {
        '0': {
          jellyId: 0,
          quantity: 10
        },
        '5': {
          jellyId: 5,
          quantity: 50
        },
        ...etc
      }
  */



  saveSessionToDB: async (cart, userId) => {
    try {

      // find existing user cart or create new user cart
      const {dataValues: order} = await Order.findOrCreateCartByUserId(userId)

      // get existing user cart's jellies-orders
      const existingJellyOrders = await JellyOrder.findAll({
        where: {orderId: order.id}
      })


      // figure out which items on the session are/aren't
      // already saved in the database
      const jelliesInCartIds = Object.keys(cart.items).map(id => parseInt(id))
      const existingJellyIds = existingJellyOrders
        .map( ({dataValues}) => dataValues.jellyId )
        .filter(id => jelliesInCartIds.includes(id))

      const newJellyOrders = Object.keys(cart.items).map(id => parseInt(id))
        .filter(item => existingJellyIds.includes(item.jellyId) )

      console.log('jellies in cart:', jelliesInCartIds)
      console.log('jellies in db:', existingJellyIds)
      console.log('new jellies in cart:', newJellyOrders)


      // update existing rows
      const updateRes = existingJellyOrders
        .filter(item => jelliesInCartIds.includes(item.dataValues.jellyId))
        .map(item => {
        // console.log('item.datavalues.jellyid',item.dataValues.jellyId)
        return item.update({
          quantity: cart.items[item.dataValues.jellyId].quantity
        })
      })

      // create new rows
      const createRes = newJellyOrders.map(jellyId =>
        JellyOrder.create({
          jellyId,
          orderId: order.id,
          quantity: cart.items[jellyId].quantity
        })
      )

      Promise.all(updateRes)
      Promise.all(createRes)

      return true

  } catch (err) {
    console.error(err)
  }
  },

  addJelly: async (cart, jellyId) => {
    const {dataValues: jelly} = await Jelly.findById(jellyId)
    const newJellies = {...cart.items}

    newJellies[jellyId]
     ? newJellies[jellyId].quantity++
     : newJellies[jellyId] = newJelly(jelly)
    const cartTotal = cart.cartTotal + jelly.priceCents
    const orderTotal = dummyTaxesAndShipping(cartTotal)
    return {
      ...cart,
      cartTotal, orderTotal,
      items: newJellies
    }
  },

    setJelly: async (cart, jellyId, quantity) => {
    const {dataValues: jelly} = await Jelly.findById(jellyId)
    const newJellies = {...cart.items}
    const quantNum = parseInt(quantity)

    newJellies[jellyId] = newJelly(jelly)
    newJellies[jellyId].quantity = quantNum

    return {
      ...cart,
      cartTotal: cart.cartTotal + jelly.priceCents,
      items: newJellies
    }
  },

  removeJelly: (cart, jellyId) => {
    const newJellies = {...cart.items}
    jelly = newJellies[jellyId]
    if (jelly) jelly.quantity--
    if (jelly.quantity < 1)
      newJellies[jellyId] = undefined
    const cartTotal = cart.cartTotal - newJellies[jellyId].priceCents
    const orderTotal = dummyTaxesAndShipping(cartTotal)
    return {
      ...cart,
      cartTotal, orderTotal,
      items: newJellies
    }
  },

  newCart: () => ({
    // clone of deserialize cart
    cartTotal: 0,
    items: {}
  })
}
