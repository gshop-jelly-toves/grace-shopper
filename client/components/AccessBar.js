import React, {Component, Link} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const AccessBar = props => {
  console.log('props is:', props)
  const {name} = props
  console.log('name is:', name)

  return (
    <div className="container-fluid" role="access">
      {/* <ul className="nav justify-content-end"> */}
      <ul className="nav nav-fill">
        <li className="nav-item">
          <p className="nav-link active" href="#">
            Welcome, {name}
          </p>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="#">
            Active
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Link
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Link
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" href="#">
            Disabled
          </a>
        </li>
      </ul>
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
