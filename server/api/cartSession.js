const { Jelly } = require('../db/models')
const newJelly = jelly => ({
  jellyId: jelly.id,
  priceCents: jelly.price,
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

  addJelly: async (cart, jellyId) => {
    const { dataValues: jelly } = await Jelly.findById(jellyId)
    const newJellies = { ... cart.items }
    newJellies[jellyId]
     ? newJellies[jellyId].quantity++
     : newJellies[jellyId] = newJelly(jelly)
    return {
      ...cart,
      cartTotal: cart.cartTotal + jelly.price,
      items: newJellies
    }
  },

  removeJelly: (cart, jellyId) => {
    const newJellies = { ... cart.items }
    jelly = newJellies[jellyId]
    if (jelly) jelly.quantity--
    if (jelly.quantity < 1)
      newJellies[jellyId] = undefined
    return {
      ...cart,
      cartTotal: cart.cartTotal - newJellies[jellyId].price,
      items: newJellies
    }
  }

}
