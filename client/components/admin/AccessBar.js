import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

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
    <div className="container-fluid">
      <nav className="nav nav-fill px-5 align-items-center" id="access-bar">
        <div className="nav-item">
          <h4>Admin: {name}</h4>
        </div>
        <div className="nav-item">
          <Link to="/admin/jellies/add" className="nav-link">
            <h4>Add Jelly</h4>
          </Link>
        </div>
        <div className="nav-item">
          <Link to="/admin/jellies/orders" className="nav-link">
            <h4>All Orders</h4>
          </Link>
        </div>
      </nav>
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
