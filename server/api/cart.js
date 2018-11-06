const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const { User, JellyOrder, Order } = require('../db/models')
const cartSession = require('./cartSession')

// see /server/middlewares/user
const {
  requireLogin,
  requireSeller,
  requireAdmin,
  requiredev
} = require('../middlewares')

module.exports = router


router.post("/checkout", requireLogin, async (req, res) => {
  const user = await User.findById(req.user.id)
  const cart = await user.checkoutActiveCart()
  let amount = cart.dataValues.orderTotal

  const customer = await stripe.customers.create({
    email: req.body.email,
    source: req.body.id
  })
  const charge = await stripe.charges.create({
    amount,
    description: "Bought jelly for my belly.",
    currency: "usd",
    customer: customer.id
  })
  res.json(charge)
});

router.get('/', async (req, res, next) => {
  let cart

  if (req.user) {
    try {
      const user = await User.findById(req.user.id)

      // i don't think we actually need to put a
      // registered user's cart on the session,
      // nonetheless leaving this for dev purposes
      cart = await user.deserializeCart()
    } catch (e) {
      next(e)
    }
  } else {
    cart = req.session.cart || cartSession.newCart()
  }

  req.session.cart = cart
  res.json(req.session.cart)
})

// /api/cart DELETE - clear cart from session and remove
// from database
router.delete('/', async (req, res, next) => {
  let {cart} = req.session

  if (cart) {
    if (req.user) {
      try {
        const user = await User.findById(req.user.id)
        await user.destroyActiveCart()
        req.session.cart = await user.deserializeCart()
      } catch (e) {
        next(e)
      }
    } else {
      req.session.cart = cartSession.newCart()
    }

    res.sendStatus(200)
  } else {
    throw new Error('req.session.cart is not defined')
  }
})

// /api/cart/add/:jellyId PUT - add a single jelly to cart`
router.put('/add/:jellyId', async (req, res, next) => {
  let {cart} = req.session

  const jellyId = req.params.jellyId
  const {quantity} = req.body
  console.log('USER', req.user)

  if (cart) {
    if (req.user) {
      // if user is logged in, save to db
      try {
        // line 44 is the only place where the registered
        // users need their cart on the session (can be fixed)
        const item = await JellyOrder.addItem(cart.id, jellyId, quantity)
        res.json(item)
      } catch (e) {
        next(e)
      }
    } else if (quantity === 1) {
      // if user is not logged in, persist item to `req.session.cart`
      req.session.cart = await cartSession.addJelly(cart, jellyId)
      res.json(req.session.cart.items[jellyId])
    } else if (quantity > 1) {
      req.session.cart = await cartSession.setJelly(cart, jellyId, quantity)
      res.json(req.session.cart.items[jellyId])
    }
  } else {
    throw new Error('req.session.cart is not defined')
  }
})

// /api/cart/add/:jellyId PUT - remove a single jelly from the cart`
router.delete('/remove/:jellyId', async (req, res, next) => {
  let {cart} = req.session
  const jellyId = req.params.jellyId

  if (cart) {
    if (req.user) {
      // if user is logged in, remove/reduce db
      try {
        const item = await JellyOrder.removeItem(cart.id, jellyId)
        res.json(
          item || {
            message: 'item not in cart'
          }
        )
      } catch (e) {
        next(e)
      }
    } else {
      // if user is not logged in, update cart session
      req.session.cart = cartSession.removeJelly(cart, jellyId)
      res.json(
        req.session.cart.items[jellyId] || {
          message: 'item not in cart'
        }
      )
    }
  } else {
    throw new Error('req.session.cart is not defined')
  }
})
