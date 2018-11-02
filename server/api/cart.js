const router = require('express').Router()
const { User, JellyOrder } = require('../db/models')
const cartSession = require('./cartSession')

// see /server/middlewares/user
const { requireLogin, requireSeller, requireAdmin, requiredev } = require('../middlewares')

module.exports = router

router.get('/', async (req, res, next) => {
  let cart

  if (req.user) {
    try {
      const user = await User.findById(req.user.id)

      // i don't think we actually need to put a 
      // registered user's cart on the session,
      // nonetheless leaving this for dev purposes
      cart = await user.deserializeCart()
    } catch (e) { next(e) }
  } else {
    cart = req.session.cart || {}
  }

  req.session.cart = cart
  res.json(req.session.cart)
})


// get route with hardcoded `jellyId = 1` for testing purposes,
// should really be a put route with `jellyId = req.body`
router.get('/add', async (req, res, next) => {
  let { cart } = req.session 
  const jellyId = 1

  if (cart) {
{
      if (req.user) {
        // if user is logged in, save to db
        try {
          const item = await JellyOrder.addItem(cart.id, jellyId)
          res.json(item)
        } catch (e) { next(e) }

      } else {
        // if user is not logged in, persist item to `req.session.cart`
        req.session.cart = cartSession.addJelly(cart, jellyId)
        res.json(req.session.cart[jellyId])
      }}

  } else {
    throw new Error('req.session.cart is not defined')
  }
})

// get route with hardcoded `jellyId = 1` for testing purposes,
// should really be a delete route with `jellyId = req.body`
router.get('/remove', async (req, res, next) => {
  let { cart } = req.session 
  const jellyId = 1

  if (cart) {

    if (req.user) {
      // if user is logged in, remove/reduce db
      try {
        const item = await JellyOrder.removeItem(cart.id, jellyId)        
        res.json(item || {
          message: 'item not in cart'
        })
      } catch (e) { next(e) }

    } else {
      // if user is not logged in, update cart session
      req.session.cart = cartSession.removeJelly(cart, jellyId)
      res.json(req.session.cart[jellyId] || {
        message: 'item not in cart'
      })
    }

  } else {
    throw new Error('req.session.cart is not defined')
  }
})