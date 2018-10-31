import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {logout} from '../store'
import {Toolbar} from './index'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div>
    <h1>Jelly for your Belly!</h1>
    <nav>
      {isLoggedIn ? (
        <div id="navbar-main">
          {/* The navbar will show these links after you log in */}
          <NavLink to="/home" activeClassName="nav-active">
            Home
          </NavLink>
          <NavLink to="/jellies" activeClassName="nav-active">
            Shop
          </NavLink>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Toolbar />
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <NavLink to="/login" activeClassName="nav-active">
            Login
          </NavLink>
          <NavLink to="/signup" activeClassName="nav-active">
            Sign Up
          </NavLink>
        </div>
      )}
      {isAdmin && <NavLink to="/admin">Admin Tools</NavLink>}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = ({ user: {user} }) => ({
    isLoggedIn: !!user.id,
    isAdmin: user.accessLevel >= 3
})

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
