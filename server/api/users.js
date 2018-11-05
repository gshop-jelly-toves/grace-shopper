const router = require('express').Router()
const { User } = require('../db/models')
const { Order } = require('../db/models')

// see /server/middlewares/user
const { requireLogin, requireSeller, requireAdmin, requiredev } = require('../middlewares')

module.exports = router

/*
  USER ROUTES
*/

router.get('/test', requireLogin, async (req, res, next) => {
  res.json({message: 'success'})
})

/*
  SELLER ROUTES
*/

// couldn't get requireSeller to work here without breaking test
// attempted to change test spec but couldn't get it to work
router.get('/', requireSeller, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})


/*
  ADMIN ROUTES
*/

router.get('/:userId/orders', requireAdmin, async (req, res, next) => {
  const { userId } = req.params

  try {
    const user = await User.findOne({
      where: {
        id: userId
      },
      include: [{model: Order}]
    })
    res.json(user)
  } catch (e) {
    console.log(e) // for debugging purposes

    // 204 => no content
    res.status(204).json({
      message: `no user by id ${userId}`
    })
  }
})

router.get('/:userId', requireAdmin, async (req, res, next) => {
  const { userId } = req.params

  try {
    const user = await User.findById(userId)
    res.json(user)
  } catch (e) {
    console.log(e) // for debugging purposes

    // 204 => no content
    res.status(204).json({
      message: `no user by id ${userId}`
    })
  }
})

/*
  DEV ROUTES
*/
