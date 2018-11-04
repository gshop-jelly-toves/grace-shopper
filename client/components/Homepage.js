import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Homepage = props => {
  // Moved to <Accessbar />
  const {email} = props

  return (
    <main role="main">
      <h3>Welcome, {email}</h3>
      {/*
   ______                                 __
  / ____/___ __________  __  __________  / /
 / /   / __ `/ ___/ __ \/ / / / ___/ _ \/ /
/ /___/ /_/ / /  / /_/ / /_/ (__  )  __/ /
\____/\__,_/_/   \____/\__,_/____/\___/_/

ON HOLD - PROBABLY IMPLEMENTING SOMETHING WILL ACTUALLY WORK T_T
      */}

      {/* <div
        id="carouselExampleSlidesOnly"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="d-block w-100"
              src="https://dummyimage.com/1200x400/000/fff.jpg&text=First+Image
"
              alt="First slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://dummyimage.com/1200x400/960/fff.jpg&text=Second+Image"
              alt="Second slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://dummyimage.com/1200x400/99c/000.jpg&text=Third+Image"
              alt="Third slide"
            />
          </div>
        </div>
      </div> */}
    </main>
  )
}

/**
 * CONTAINER
 */
const mapState = state => ({
  email: state.user.user.email
})

export default connect(mapState)(Homepage)

/**
 * PROP TYPES
 */
Homepage.propTypes = {
  email: PropTypes.string
}
