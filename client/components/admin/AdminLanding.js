import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const AdminLanding = ({name}) => {
  return (
    <div className="d-flex flex-column m-auto align-items-center">
      <div className="p-3">
        <h1>Welcome {name}!</h1>
      </div>
      <div className="pb-5 mx-auto">
        <h3>It is {new Date(Date.now()).toUTCString()}</h3>
      </div>
      <div className="p-auto">
        <h2>Admin Tools</h2>
      </div>
      <div className="p-3">
        <Link to="/admin/jellies/add" className="nav-link">
          <h3>Add Jelly</h3>
        </Link>
        <Link to="/admin/jellies/orders" className="nav-link">
          <h3>All Orders</h3>
        </Link>
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

export default connect(mapState)(AdminLanding)

/**
 * PROP TYPES
 */
AdminLanding.propTypes = {
  name: PropTypes.string
}
