const passport= require('passport')
const { User } = require('../db/models')

// passport registration
passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({where: {id}})
    // console.log('USER', user)
    if (user) user.dataValues.accessLevel = user.getAccessLevel()
    done(null, user)
  } catch (err) {
    done(err)
  }
})