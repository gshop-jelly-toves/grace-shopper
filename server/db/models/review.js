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

const averageRating = async review => {
  console.log(Product)
  console.log(Review)
  const productP = Product.findById(review.productId)
  const reviewsP = Review.findAll({
    where: {
      productId: review.productId
    }
  })

  const [productRes, reviewsRes] = await Promise.all([productP, reviewsP])
  const product = productRes.data
  const reviews = reviewsRes.data

  const rating = reviews.reduce((a, b) => a + b.starRating, 0) / reviews.length
  await product.update({rating})
}

Review.afterCreate(averageRating)

module.exports = Review
