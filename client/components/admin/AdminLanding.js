import React from 'react'
import {Link} from 'react-router-dom'

const AdminLanding = props => {
  return (
    <div>
      <Link to="/admin/jellies/add">
        <p>Add Jelly</p>
      </Link>
      <Link to="/admin/jellies/orders">
        <p>Pending Orders</p>
      </Link>
    </div>
  )
}

export default AdminLanding
