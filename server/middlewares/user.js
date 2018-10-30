const { User } = require('../db/models')


// `checkAccessLevel` is a factory function which produces 
//  middleware funcs that make sure the user has the necessary permissions
const checkAccessLevel = requiredLevel => async (req, res, next) => {
  // isAuthenticated comes from passport. it makes sure user is logged in.
  // not sure if this will work with users who don't sign in with
  // google. may have to write a custom req prototype method for this
  if (req.isAuthenticated()) {
    // because the user is signed in, access is on req.user 
    // this is not default, it is assigned in deserialize user
    const { accessLevel } = req.user

    try {
      // const user = await User.findById(id)
      
      // sorry for the ternary.
      // ok we got the user, check if they can get access
      accessLevel >= requiredLevel ?
        // they got access, proceed to route (or next middleware)
        next()
        // they don't have access (suspiscious...)
      : res.status(403).json({
        message: `requires at least level ${requiredLevel} permissions`
      })

      // if for some odd & unlikely reason the current user doesn't exist,
      // this will be caught below and handled by error catching middleware
    } catch (e) { next(e) }

  } else {
    // the user is not logged in
    res.status(403).json({
      message: 'you must be logged in to continue',
    });
  }
}

const requireLogin = checkAccessLevel(1)
const requireSeller = checkAccessLevel(2)
const requireAdmin = checkAccessLevel(3)
const requireDev = checkAccessLevel(4)

module.exports = {
  requireLogin,
  requireSeller,
  requireAdmin,
  requireDev
}