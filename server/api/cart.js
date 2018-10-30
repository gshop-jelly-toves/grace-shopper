const router = require('express').Router()
const { Order } = require('../db/models')
const { requireLogin, requireSeller, requireAdmin, requiredev } = require('../middlewares')

module.exports = router

/*
  USER ROUTES
*/

// /api/cart GET
router.get('/', requireLogin, async (req, res, next) => {
  try {
    const cart = await Order.findOne({where: {
      userId: req.user.id,
      status: 'cart'
    }})
  } catch (e) { next(e) }
})


