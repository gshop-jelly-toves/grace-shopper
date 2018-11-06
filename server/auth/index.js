const router = require('express').Router()
const User = require('../db/models/user')
const cartSession = require('../api/cartSession')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      if (req.session.cart.cartTotal)
        await cartSession.saveSessionToDB(req.session.cart, user.dataValues.id)
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {

    // should prevent anyone from creating 
    // a user with `role: 'dev'` on the req.body
    const newUser = {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name
    }
    
    const user = await User.create(newUser)
    // // persist cart to db
    if (req.session.cart.cartTotal)
      await cartSession.saveSessionToDB(req.session.cart, user.dataValues.id)
    req.session.cart = await user.deserializeCart()

    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', async (req, res, next) => {
  try {
    // persist cart to db
    
    if (req.session.cart.cartTotal)
      await cartSession.saveSessionToDB(req.session.cart, req.user.id)

  res.json(req.user)
  } catch (e) { next(e)}
})

router.use('/google', require('./google'))
