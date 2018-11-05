const router = require('express').Router()
const { User, JellyOrder, Order } = require('../db/models')
const cartSession = require('./cartSession')

// see /server/middlewares/user
const { requireLogin, requireSeller, requireAdmin, requiredev } = require('../middlewares')

module.exports = router

router.get('/', requireLogin, async (req, res, next) => {
  try {


    const orders = await Order.findAll({
      where: {
        userId: req.user.id
      }
    })

    res.json(orders)
  } catch (e) {
    next(e)
  }
})
