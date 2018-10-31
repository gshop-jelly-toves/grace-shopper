const Sequelize = require('sequelize')
const db = require('../db')

const Jelly = db.define('jelly', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  photo: {
    type: Sequelize.STRING,
    defaultValue: 'https://imgur.com/a/gFQZ7yi'
  },
  rating: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  }
})

module.exports = Jelly
