'use strict'

const db = require('../server/db')
const {Order, User, Product, Review} = require('../server/db/models')

/*  ------------- Dummy Data -------------
    - 50 Orders
    - 50 Users      (all 'user' level)
    - 20 Products
    - 40 Reviews    (80% of users)
*/

const dummyUsers = require('../server/db/dummy-data/dummy-users.json')
const dummyOrders = require('../server/db/dummy-data/dummy-orders.json')
const dummyProducts = require('../server/db/dummy-data/dummy-products.json')
const dummyReviews = require('../server/db/dummy-data/dummy-reviews.json')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await Promise.all(dummyUsers.map(user => User.create(user)))
  await Promise.all(dummyOrders.map(order => Order.create(order)))
  await Promise.all(dummyProducts.map(product => Product.create(product)))
  await Promise.all(dummyReviews.map(review => Review.create(review)))

  console.log(`\n########### SEEDING REPORT ###########\n`)
  console.log(`Seeded ${dummyOrders.length} orders.`)
  console.log(`Seeded ${dummyUsers.length} users.`)
  console.log(`Seeded ${dummyProducts.length} products.`)
  console.log(`Seeded ${dummyReviews.length} reviews.`)
  console.log(`Seeding completed successfully!\n`)
  console.log(`######################################\n`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
