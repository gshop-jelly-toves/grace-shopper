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
    allowNull: true,
    defaultValue:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/300px-Cat03.jpg'
  },
  rating: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  }
})

module.exports = Jelly
