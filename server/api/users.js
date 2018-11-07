const router = require('express').Router()
const {User, Order, Address, Review} = require('../db/models')

// see /server/middlewares/user
const {
  requireLogin,
  requireSeller,
  requireAdmin,
  requiredev
} = require('../middlewares')

module.exports = router

/*
  USER ROUTES
*/

// User profile - showcases their product reviews
router.get('/:userId', async (req, res, next) => {
  const {userId} = req.params

  try {
    const user = await User.findById(userId)

    // Destructure the response object
    // Pull off only the name to protect the user.
    const {name} = user

    const reviews = await Review.findAll({
      where: {
        userId: userId
      }
    })

    // Pass in the name and that user's reviews to a response object; res. that
    const response = {
      name,
      reviews
    }
    res.json(response)
  } catch (e) {
    console.log(e) // for debugging purposes

    // 204 => no content
    res.status(204).json({
      message: `no user by id ${userId}`
    })
  }
})

router.get('/address', requireLogin, async (req, res, next) => {
  try {
    const addresses = await Address.findAll({
      where: {userId: req.user.id}
    })
    res.json(addresses[0] || {})
  } catch (err) {
    next(err)
  }
})

router.post('/address', requireLogin, async (req, res, next) => {
  try {
    const newAddress = {
      ...req.body,
      id: undefined,
      userId: req.user.id
    }
    console.log('-'.repeat(50))
    console.log('newAddress:', newAddress)
    console.log('-'.repeat(50))
    const address = await Address.create(newAddress)
    res.json(address)
  } catch (err) {
    next(err)
  }
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
  const {userId} = req.params

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

/*
  DEV ROUTES
*/
