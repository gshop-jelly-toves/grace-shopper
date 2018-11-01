const router = require('express').Router()
const { User, JellyOrder } = require('../db/models')

// see /server/middlewares/user
const { requireLogin, requireSeller, requireAdmin, requiredev } = require('../middlewares')

module.exports = router

router.get('/', async (req, res, next) => {
  let cart

  if (req.user) {
    try {
      const user = await User.findById(req.user.id)
      cart = await user.deserializeCart()
    } catch (e) { next(e) }
  } else {
    cart = req.session.cart || {
      status: 'cart',
      items: {},
    }
  }

  req.session.cart = cart
  res.json(req.session.cart)
})

router.get('/add', async (req, res, next) => {
  const { cart } = req.session 
  const jellyId = 1

  if (cart) {

    if (req.user) {

      try {
        const item = await JellyOrder.findOrCreate({where: { 
          jellyId,
          orderId: cart.id
        }})
        await item[0].update({quantity: item[0].quantity+1})
        cart.items[item[0].dataValues.jellyId] = item[0].dataValues
        res.json(item[0])
      } catch (e) { next(e) }

    } else {

      if (cart.items[jellyId] ) {
        cart.items[jellyId].quantity++
      } else {
        cart.items[jellyId] = {
          jellyId,
          quantity: 1
        }
      }
      res.send(cart.items[jellyId])
    }

  } else {
    throw new Error('req.session.cart is not defined')
  }
})