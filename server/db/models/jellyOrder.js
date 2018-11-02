const Sequelize = require('sequelize')
const db = require('../db')

const jellyOrder = db.define('jelly-orders', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

jellyOrder.addItem = async function(orderId, jellyId) {
  try {
    const { [0]: item } = await jellyOrder.findOrCreate({ 
      where: { orderId, jellyId }
    })
    return await item.update({ quantity: item.quantity+1 })
  } catch (e) { console.error(e) }
}

jellyOrder.removeItem = async function(orderId, jellyId) {
  try {
    // todo
  } catch (e) { console.error(e) }
}

module.exports = jellyOrder