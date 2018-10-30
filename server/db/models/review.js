const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./product')

const Review = db.define('review', {
  text: {
    type: Sequelize.TEXT,
    validate: {
      min: {
        args: [72],
        msg: 'Minimum review is 72 characters'
      }
    }
  },
  starRating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  }
})

// Must fix this.
/* ERROR
  TypeError: Cannot read property 'reduce' of undefined
    at Function.averageRating (/Users/ChrisMejia/Google Drive/FS/Senior-Phase/grace-shopper/server/db/models/review.js:36:26)
    at process._tickCallback (internal/process/next_tick.js:68:7)
*/

// const averageRating = async review => {
//   const productP = Product.findById(review.productId)
//   const reviewsP = Review.findAll({
//     where: {
//       productId: review.productId
//     }
//   })

//   const [productRes, reviewsRes] = await Promise.all([productP, reviewsP])
//   const product = productRes.data
//   const reviews = reviewsRes.data

//   const rating = reviews.reduce((a, b) => a + b.starRating, 0) / reviews.length
//   await product.update({rating})
// }

// Review.afterCreate(averageRating)

module.exports = Review
