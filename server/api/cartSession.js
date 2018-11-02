const newJelly = jellyId => ({
  jellyId,
  quantity: 1
})

module.exports = {

  addJelly: (jellies, jellyId) => {
    const newJellies = { ... jellies }
    newJellies[jellyId]
     ? newJellies[jellyId].quantity++
     : newJellies[jellyId] = newJelly(jellyId)
    return newJellies
  },

  removeJelly: (jellies, jellyId) => {
    const newJellies = { ... jellies }
    jelly = newJellies[jellyId]
    if (jelly) jelly.quantity--
    if (jelly.quantity < 1)
      newJellies[jellyId] = undefined
    return newJellies
  }

}
