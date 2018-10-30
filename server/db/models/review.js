const Sequelize = require('sequelize')
const db = require('../db')

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
    type: Sequelize.FLOAT,
    validate: {
      min: 1,
      max: 5
    }
  }
})

module.exports = Review
