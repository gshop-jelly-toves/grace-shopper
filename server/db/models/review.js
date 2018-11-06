const Sequelize = require('sequelize')
const db = require('../db')
const Jelly = db.models.jelly

const Review = db.define('review', {
  title: {
    type: Sequelize.TEXT
  },
  body: {
    type: Sequelize.TEXT,
    validate: {
      min: {
        args: [72],
        msg: 'Minimum review is 72 characters'
      }
    }
  },
  date: {
    type: Sequelize.TEXT
  },
  starRating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  }
})

const averageRating = async review => {
  try {
    const jellyP = Jelly.findById(review.jellyId)
    const reviewsP = Review.findAll({
      where: {jellyId: review.jellyId}
    })

    const [jellyRes, reviewsRes] = await Promise.all([jellyP, reviewsP])

    const reviews = Object.keys(reviewsRes).map(
      keys => reviewsRes[keys].dataValues
    )

    let rating = reviews.reduce((a, b) => a + b.starRating, 0) / reviews.length
    rating = Math.round(rating * 10) / 10

    jellyRes.update({rating})
  } catch (e) {
    console.error(e)
  }
}

Review.afterCreate(averageRating)

module.exports = Review
