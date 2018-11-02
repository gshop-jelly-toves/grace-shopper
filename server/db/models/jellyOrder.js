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
    // `findOrCreate` (oddly) returns an array containing a single 
    // instance, so a little destructuring can be used
    const { [0]: item } = await jellyOrder.findOrCreate({ 
      where: { orderId, jellyId }
    })
    
    return await item.update({ 
      quantity: item.quantity+1 
    })
  } catch (e) { console.error(e) }
}

jellyOrder.removeItem = async function(orderId, jellyId) {
  try {
    let item = await jellyOrder.findOne({where: {
      jellyId, orderId
    }})

    if (item) 
      item = await item.update({ 
        quantity: item.quantity-1
      })

    return item
  } catch (e) { console.error(e) }
}

const rejectInvalidQuantity = item => {
  if (item.quantity < 1)
    item.destroy()
}

jellyOrder.afterUpdate(rejectInvalidQuantity)

module.exports = jellyOrder
