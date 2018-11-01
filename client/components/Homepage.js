import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Homepage = props => {
  // const {email} = props

  return (
    <main role="main">
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className="active"
          />
          <li data-target="#carouselExampleIndicators" data-slide-to="1" />
          <li data-target="#carouselExampleIndicators" data-slide-to="2" />
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src="..." alt="First slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="..." alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="..." alt="Third slide" />
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
          {/*<h3>Welcome, {email}</h3>*/}
        </a>
      </div>
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
