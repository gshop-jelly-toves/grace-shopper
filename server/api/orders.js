const router = require('express').Router()
const { User, JellyOrder, Order, Jelly } = require('../db/models')
const cartSession = require('./cartSession')

// see /server/middlewares/user
const { requireLogin, requireSeller, requireAdmin, requiredev } = require('../middlewares')

module.exports = router


//GET all orders for the session user ID
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

//ADMIN ONLY
//GET all orders
router.get('/all', requireAdmin, async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (e) {
    next(e)
  }
})

// include: [{model: JellyOrder}]

router.get('/:orderId', requireAdmin, async (req, res, next) => {
  try {
    const order = await JellyOrder.findAll({
      where: {
        orderId: req.params.orderId
      }, include: [{all: true }]
    })

    res.json(order)
  } catch (e) {
    next(e)
  }
})



router.put('/:orderId', requireAdmin, async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.orderId
      }
    })

    console.log(req.body.newOrderType)
    order.update({
      status: req.body.newOrderType
    })
    res.json(order)
  } catch (e) {
    next(e)
  }
})
