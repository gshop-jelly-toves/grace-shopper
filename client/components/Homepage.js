import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Homepage = props => {
  // Leave in or else Travis CI test will fail!
  // Edit test later!
  const {email} = props

  return (
    <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
      {/*
    __  __                __
   / / / /__  _________  / /
  / /_/ / _ \/ ___/ __ \/ /
 / __  /  __/ /  / /_/ /_/
/_/ /_/\___/_/   \____(_)
    */}
      <div className="col-md-5 p-lg-5 mx-auto my-5">
        <h1 className="display-4 font-weight-normal">Punny headline</h1>
        <p className="lead font-weight-normal">
          And an even wittier subheading to boot. Jumpstart your marketing
          efforts with this example based on Apple's marketing pages.
        </p>
        <a className="btn btn-outline-secondary" href="#">
          {/*
          Leave in or else
          Travis CI test will fail!
          Edit test later!
          */}
          <h3>Welcome, {email}</h3>
        </a>
      </div>
      <div className="product-device box-shadow d-none d-md-block" />
      <div className="product-device product-device-2 box-shadow d-none d-md-block" />
    </div>
  )
  // <main role="main">
  // </main>
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
