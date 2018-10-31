'use strict'

const db = require('../db')
const dbFilled = require('../db/db')
const {Order, User, Jelly, Review, Category} = require('../db/models')

/*  -------------  Data -------------
    - 11 Categories  (multiple per jelly??)
    - 50 Orders
    - 50 Users      (all 'user' level)
    - 50 Jellies
    - 100 Reviews   (~2 per jelly)
*/
// SEED FILES
const Categories = require('./categories.json')
const Users = require('./users.json')
const Orders = require('./orders.json')
const Jellies = require('./jellies.json')
const Reviews = require('./reviews.json')

const {jellyCategory} = db.models

const JellyCat = require('./jelly-category.json')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  // MODEL TABLES
  await Promise.all(Categories.map(category => Category.create(category)))
  await Promise.all(Users.map(user => User.create(user)))
  await Promise.all(Orders.map(order => Order.create(order)))
  await Promise.all(Jellies.map(jelly => Jelly.create(jelly)))
  await Promise.all(Reviews.map(review => Review.create(review)))

  // ASSOCIATION TABLES
  await Promise.all(JellyCat.map(jellyCat => jellyCategory.create(jellyCat)))

  console.log(`\n########### SEEDING REPORT ###########\n`)
  console.log(`Seeded ${Categories.length} categories.`)
  console.log(`Seeded ${Orders.length} orders.`)
  console.log(`Seeded ${Users.length} users.`)
  console.log(`Seeded ${Jellies.length} jellies.`)
  console.log(`Seeded ${Reviews.length} reviews.\n`)
  console.log(`Seeded ${JellyCat.length} associations.\n`)
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
