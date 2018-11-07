// /* global describe beforeEach it */

// const {expect} = require('chai')
// const request = require('supertest')
// const db = require('../db')
// const app = require('../index')

// describe('Jelly routes', () => {
//   beforeEach(() => {
//     return db.sync({force: true})
//   })

//   describe('get jellies', () => {
//     it('GET responds jelly object', () => {
//       request(app)
//         .get('/jellies?index=0&amount=10')
//         .expect(200)
//         .expect('Content-Type', /json/)
//         .expect(res => {
//           expect(res.body).to.eql({})
//         })
//     })
//     it('GET responds with jelly array matching category', () => {
//       request(app)
//         .get('/jellies/categories/2')
//         .expect(200)
//         .expect('Content-Type', /json/)
//         .expect(res => {
//           expect(res.body).to.eql([])
//         })
//     })
//   })
// })
