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



// get route with hardcoded `jellyId = 1` for testing purposes,
// should really be a put route with `jellyId = req.body`
router.get('/add', async (req, res, next) => {
  const { cart } = req.session 
  const jellyId = 1

  if (cart) {

    if (req.user) {
      // if user is logged in, save to db
      // `req.session.cart` will be handled via
      // deserializeCart whenever a user
      // requests it
      try {
        const item = await JellyOrder.saveItem(cart.id, jellyId)
        cart.items[item.jellyId] = item
        res.json(item)
      } catch (e) { next(e) }

    } else {
      // if user is not logged in, manually 
      // persist item to cart session.
      // this logic may want to be handled elsewhere
      if (cart.items[jellyId] ) {
        cart.items[jellyId].quantity++
      } else {
        cart.items[jellyId] = {
          jellyId,
          quantity: 1
        }
      }

      res.json(cart.items[jellyId])
    }

  } else {
    throw new Error('req.session.cart is not defined')
  }
})