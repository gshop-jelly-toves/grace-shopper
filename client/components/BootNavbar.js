import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink, Link} from 'react-router-dom'
import {logout} from '../store'
// import {Category, Toolbar} from './index'

// --- WHAT'S BEEN BOOTSTRAP REFACTORED ---
// ↳ BootNavbar.js has replaced Navbar.js (called in app.js)
// ↳ HomePage.js cleaned and container'd; has carousel (hero image??) prep

// --- IMPLEMENTED AND WORKING ---
// ↳ DONE - isLoggedin implementation
// ↳ DONE - isAdmin implementation
// ↳ DONE - Bringing in email props used on homepage to display user name in
// ↳ WORKING - All routes.js routes
// ↳ JellyShop renders / pagination still works
// ↳ Google OAuth works - displays name on page
// ↳ Admin Tools links
// ↳ Bring in Toolbar (jellyShop filtering function) as Category
// ↳ Getting the search field to cooperate (see note in bar on localhost)

// --- STILL NEEDS ---
// ↳ Fix layout of login and signup

const BootNavbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand">
      {/*
    ____  ________    __    ________________
   / __ )/ ____/ /   / /   /  _/ ____/ ___( )
  / __  / __/ / /   / /    / // __/  \__ \|/
 / /_/ / /___/ /___/ /____/ // /___ ___/ /
/_____/_____/_____/_____/__//_____/_____/_
      / / ____/ /   / /   /  _/ ____/ ___/
 __  / / __/ / /   / /    / // __/  \__ \
/ /_/ / /___/ /___/ /____/ // /___ ___/ /
\____/_____/_____/_____/___/_____//____/
      */}
      <Link to="/home">
        <div id="shopName">Bellies' Jellies</div>
        <div id="shopSlogan">Jelly for your belly!</div>
      </Link>
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    {/*
    _   __            __    _       __
   / | / /___ __   __/ /   (_)___  / /_______
  /  |/ / __ `/ | / / /   / / __ \/ //_/ ___/
 / /|  / /_/ /| |/ / /___/ / / / / ,< (__  )
/_/ |_/\__,_/ |___/_____/_/_/ /_/_/|_/____/
    */}
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <div className="nav-link">
            <NavLink to="/jellies" activeClassName="nav-active">
              Jelly Shop
            </NavLink>
            <NavLink to="/cart" activeClassName="nav-active">
              Shopping Cart
            </NavLink>
          </div>
        </li>
        {/*
    __                      ____         ______        __
   / /   ____  ____ _      /  _/___    _/_/ __ \__  __/ /_
  / /   / __ \/ __ `/_____ / // __ \ _/_// / / / / / / __/
 / /___/ /_/ / /_/ /_____// // / / //_/ / /_/ / /_/ / /_
/_____/\____/\__, /     /___/_/ /_/_/   \____/\__,_/\__/
            /____/
        */}
        {isLoggedIn ? (
          <Fragment>
            <li className="nav-item">
              <div className="nav-link" href="#" onClick={handleClick}>
                Logout
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link">
                <NavLink to="/orders" activeClassName="nav-active">
                  Order History
                </NavLink>
              </div>
            </li>
          </Fragment>
        ) : (
          <Fragment>
            <li className="nav-item">
              <div className="nav-link">
                <NavLink to="/login" activeClassName="nav-active">
                  Login
                </NavLink>
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link">
                <NavLink to="/signup" activeClassName="nav-active">
                  Sign Up
                </NavLink>
              </div>
            </li>
          </Fragment>
        )}
        {/*
    ___       __          _          ______            __
   /   | ____/ /___ ___  (_)___     /_  __/___  ____  / /____
  / /| |/ __  / __ `__ \/ / __ \     / / / __ \/ __ \/ / ___/
 / ___ / /_/ / / / / / / / / / /    / / / /_/ / /_/ / (__  )
/_/  |_\__,_/_/ /_/ /_/_/_/ /_/    /_/  \____/\____/_/____/
        */}
        {isAdmin && (
          <li className="nav-item">
            <div className="nav-link">
              <NavLink to="/admin">Admin Tools</NavLink>
            </div>
          </li>
        )}

        {/* <li className="nav-item">
          <Category />
        </li> */}
      </ul>
      {/*

            The plan here is to get admin links
            to be a dropdown somehow
            by porting over the admin functionalities

        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Dropdown as Admin?
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <a className="dropdown-item" href="#">
              Action
            </a>
            <a className="dropdown-item" href="#">
              Another action
            </a>
            <div className="dropdown-divider" />
            <a className="dropdown-item" href="#">
              Something else here
            </a>
          </div>
        </li>
        */}
      {/*
   _____                      __
  / ___/___  ____ ___________/ /_
  \__ \/ _ \/ __ `/ ___/ ___/ __ \
 ___/ /  __/ /_/ / /  / /__/ / / /
/____/\___/\__,_/_/   \___/_/ /_/
        */}
      {/* <Toolbar /> */}
    </div>
  </nav>
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

export default connect(mapState, mapDispatch)(BootNavbar)

/**
 * PROP TYPES
 */
BootNavbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
