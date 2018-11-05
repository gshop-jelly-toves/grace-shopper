/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Homepage} from './Homepage'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Homepage', () => {
  let homepage

  beforeEach(() => {
    homepage = shallow(<Homepage email="cody@gmail.com" />)
  })

  it('renders the name in an h3', () => {
    expect(homepage.find('h3').text()).to.be.equal('Welcome, cody@gmail.com')
  })
})
