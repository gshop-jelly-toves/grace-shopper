const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/jellies', require('./jellies'))
router.use('/cart', require('./cart'))
router.use('/stripe', require('./stripe'))
router.use('/order')

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
