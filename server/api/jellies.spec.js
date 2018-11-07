/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('Jelly routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/jellies/', () => {
    // still funky
    // it('GET /api/users', async () => {
    //   const cody = {
    //     email: 'cody@puppybook.com',
    //     password: 'password123',
    //     role: 'seller'
    //   }
    //   const authenticatedUser = request.agent(app)
    //   await User.create(cody)
    //   const res1 = await authenticatedUser
    //     .post('/login', {
    //       email: cody.email,
    //       password: cody.password
    //     })
    //   console.log(res1)
    //   const res2 = await authenticatedUser
    //     .get('/api/users')
    //     .expect(200)
    //   expect(res2.body).to.be.an('array')
    //   expect(res2.body[0].email).to.be.equal(cody.email)
    // })
  }) // end describe('/api/jellies')
}) // end describe('User routes')
