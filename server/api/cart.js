const router = require('express').Router()
const { User } = require('../db/models')

// see /server/middlewares/user
const { requireLogin, requireSeller, requireAdmin, requiredev } = require('../middlewares')

module.exports = router

router.get('/', async (req, res, user) => {
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

// router.get('/add', async (req, res, next) => {
//   req.session.cart.push({jelly:'jelly'})
//   res.json(req.session.cart)
// })