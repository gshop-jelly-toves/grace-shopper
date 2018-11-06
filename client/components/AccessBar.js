import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Searchbar} from './index'

const AccessBar = props => {
  console.log('props is:', props)
  const {name} = props
  console.log('name is:', name)

  return (
    /*
    ___                            ____
   /   | _____________  __________/ __ )____ ______
  / /| |/ ___/ ___/ _ \/ ___/ ___/ __  / __ `/ ___/
 / ___ / /__/ /__/  __(__  |__  ) /_/ / /_/ / /
/_/  |_\___/\___/\___/____/____/_____/\__,_/_/
    */
    <div
      className="container-fluid align-items-center"
      id="access-bar"
      role="access"
    >
      {/* <ul className="nav justify-content-end"> */}
      <div className="nav nav-fill">
        <div className="nav-item">
          <p className="navbar-text">Welcome!</p>
        </div>
        <div className="nav-item">
          <p className="navbar-text">Are you ready for this jelly?</p>
        </div>
        <div className="nav-item">
          <div className="nav-link" href="#">
            {/* where categories will go once active. inactive for pull req.
            <Category />
            */}
          </div>
        </div>
        <div className="nav-item">
          <div className="nav-link" href="#">
            <Searchbar />
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => ({
  name: state.user.user.name
})

export default connect(mapState)(AccessBar)

/**
 * PROP TYPES
 */
AccessBar.propTypes = {
  name: PropTypes.string
}
