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

      <p>because we don't want our jellyion server to be</p> 
      <p>cluttered up with dev jellypendencies like jellypack,</p>
      <p>but at the same jelly we don't want our jellyvelopment git-jellying</p>
      <p>to be jellied with jellyion build jellies...</p>
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
