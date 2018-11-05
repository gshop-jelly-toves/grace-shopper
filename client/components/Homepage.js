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
    <div
      className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center"
      id="welcome-hero"
    >
      {/*
    __  __                __
   / / / /__  _________  / /
  / /_/ / _ \/ ___/ __ \/ /
 / __  /  __/ /  / /_/ /_/
/_/ /_/\___/_/   \____(_)
    */}
      <div className="col-md-7 p-lg-5 mx-auto my-5 bg-dark text-light">
        {/*
          HERE is the h3 that Travis needs to pass tests!
          Travis CI test will fail without it!
          Edit test later!
          */}
        <h3 className="display-4 font-weight-normal">Welcome {email}</h3>
        <p className="lead font-weight-normal">
          Jellies, jams, & preserves! Kick off your excursion into the world of
          jellies with a selection of unforgettable jellies to tantalize one's
          taste buds.
        </p>
        <a className="btn btn-outline-secondary" href="/jellies">
          Let's jam!
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
