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

jellyOrder.saveItem = async function(orderId, jellyId) {
  try {
    const { [0]: item } = await jellyOrder.findOrCreate({ 
      where: { orderId, jellyId }
    })
    await item.update({ quantity: item.quantity+1 })
    return item
  } catch (e) { console.error(e) }
}

module.exports = jellyOrder