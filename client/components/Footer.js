import React, {Component, Link} from 'react'
// import PropTypes from 'prop-types'
// import {connect} from 'react-redux'
// import {Category, Searchbar} from './index'

const Footer = () => {
  return (
    /*
    ______            __
   / ____/___  ____  / /____  _____
  / /_  / __ \/ __ \/ __/ _ \/ ___/
 / __/ / /_/ / /_/ / /_/  __/ /
/_/    \____/\____/\__/\___/_/
    */
    <footer className="fixed-bottom bg-dark">
      <div className="container">
        <span className="text-muted">Place sticky footer content here.</span>
      </div>
    </footer>
  )
}

export default Footer
/**
 * CONTAINER
 */
// const mapState = state => ({
//   name: state.user.user.name
// })

// export default connect(mapState)(AccessBar)

/**
 * PROP TYPES
 */
// AccessBar.propTypes = {
//   name: PropTypes.string
// }
