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
    cart = req.session.cart || []
  }

  req.session.cart = cart
  res.json(req.session.cart)
})

router.put('/', async (req, res, next) => {
  if (req.session.cart) {
    try {
      const jellyId = req.body
      const item = await JellyOrder.findOrCreate({
        jellyId,
        orderId: req.session.cart.id
      })
      item = await item.update({quantity: item.quantity+1})
      res.json(item)
    } catch (e) { next(e) }
  } else {
    throw new Error('req.session.cart is not defined')
  }
})