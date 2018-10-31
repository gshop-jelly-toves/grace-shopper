import React from 'react'
import {Link} from 'react-router-dom'

const AdminLanding = props => {
  return (
    <div>
      <Link to="/admin/jellies/add">
        <p>Add Jelly</p>
      </Link>
    </div>
  )
}

export default AdminLanding
