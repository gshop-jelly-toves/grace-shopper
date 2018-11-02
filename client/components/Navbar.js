import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink, Link} from 'react-router-dom'
import {logout} from '../store'
import {Toolbar} from './index'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div>
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark d-flex align-items-center">
      {isLoggedIn ? (
        <div id="navbar-main">
          {/* The navbar will show these links after you log in */}
          <Link to="/home">
            <div id="shopName">Bellies' Jellies</div>
            <div id="shopSlogan">Jelly for your belly!</div>
          </Link>
          <div className="d-flex p-2 bd-highlight">
            <NavLink to="/jellies" activeClassName="nav-active">
              Shop
            </NavLink>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
          <Toolbar />
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/home">
            <div id="shopName">Bellies' Jellies</div>
            <div id="shopSlogan">Jelly for your belly!</div>
          </Link>
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
const mapState = ({user: {user}}) => ({
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
