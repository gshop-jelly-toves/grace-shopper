const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
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
  category: {
    type: Sequelize.ENUM('spicy', 'floral', 'iconic', 'performance', 'cosmetic')
  },
  photo: {
    type: Sequelize.STRING,
    defaultValue: 'https://imgur.com/a/gFQZ7yi'
  }
})

module.exports = Product
