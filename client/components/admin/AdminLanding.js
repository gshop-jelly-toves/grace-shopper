import React from 'react'
import {Link} from 'react-router-dom'

const AdminLanding = props => {
  return (
    <div>
      <Link to="/admin/addjelly">
        <p>Add Jelly</p>
      </Link>
    </div>
  )
}

export default AdminLanding
