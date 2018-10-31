const Sequelize = require('sequelize')
const db = require('../db')
const Jelly = require('./jelly')

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

const averageRating = async review => {
  const jellyP = Jelly.findById(review.jellyId)
  const reviewsP = Review.findAll({
    where: { jellyId: review.jellyId }
  })
  
  const [jellyRes, reviewsRes] = await Promise.all([jellyP, reviewsP])

  const reviews = Object.keys(reviewsRes).map(keys => reviewsRes[keys] )
    .map(review => review.dataValues)

  let rating = reviews.reduce((a, b) => a + b.starRating, 0) / reviews.length
  rating = Math.round(rating * 10) / 10

  await jellyRes.update({rating})
}

Review.afterCreate(averageRating)

module.exports = Review
