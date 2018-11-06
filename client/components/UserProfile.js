import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class UserProfile extends Component {}

const mapState = ({jellies: {jellies}, user: {user}}) => ({
  jellies,
  user,
  // reviews /* to access reviews.length */,
  isAdmin: user.accessLevel >= 3,
  isLoggedIn: user.accessLevel >= 1
})

const mapDispatch = dispatch => ({
  fetchSingleJelly: jellyId => dispatch(fetchSingleJelly(jellyId)),
  addToCart: (jellyId, quantity) => dispatch(addJellyById(jellyId, quantity))
})

export default connect(mapState, mapDispatch)(SingleJelly)
