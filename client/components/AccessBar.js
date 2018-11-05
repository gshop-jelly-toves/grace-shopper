import React, {Component, Link} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Category, Toolbar} from './index'

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
    <div className="container-fluid align-middle" id="access-bar" role="access">
      {/* <ul className="nav justify-content-end"> */}
      <div className="nav nav-fill">
        <div className="nav-item">
          <p className="nav-link active" href="#">
            Welcome {name}
          </p>
        </div>
        <div className="nav-item">
          <a className="nav-link active" href="#">
            Yellow only to show Accessbar size
          </a>
        </div>
        <div className="nav-item">
          <a className="nav-link" href="#">
            <Category />
          </a>
        </div>
        <div className="nav-item">
          <div className="nav-link" href="#">
            <Toolbar />
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
