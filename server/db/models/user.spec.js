/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })

      it('returns the correct access level', () => {
        expect(cody.getAccessLevel()).to.be.equal(1)
      })

    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')

  describe('default role', () => {
    let cody
    
    beforeEach(async () => {
      cody = await User.create({
        email: 'cody@puppybook.com',
        password: 'bones'
      })
    })

    it('defaults role to user', () => {
      expect(cody.role).to.be.equal('user')
    })
  })

}) // end describe('User model')
