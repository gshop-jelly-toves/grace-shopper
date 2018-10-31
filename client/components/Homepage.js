import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Homepage = props => {
  const {email} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>

      <p>because we don't want our jelly server to be</p> 
      <p>cluttered with dev dependencies like jellypack,</p>
      <p>we adhere to strict jellyOps principles in</p>
      <p>order avoid any jelly-merge conflicts</p>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => ({
  email: state.user.user.email
})

export default connect(mapState)(Homepage)

/**
 * PROP TYPES
 */
Homepage.propTypes = {
  email: PropTypes.string
}
