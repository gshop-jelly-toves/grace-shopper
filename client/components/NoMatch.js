import React from 'react'
import {Link} from 'react-router-dom'

const NoMatch = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-12 text-center">
          <h1 id="xl-text">WHOOPS</h1>
          <h1>No jellies here!</h1>
        </div>
      </div>
      <div className="row justify-content-center my-5">
        <div className="col-md-12 text-center">
          {/* <span className="display-1 d-block">404</span> */}
          {/* <div className="mb-4 lead">
              The page you are looking for was not found.
            </div> */}
          <br />
          <h2 className="btn btn-link">
            <Link to="/home">
              <button type="button" className="btn btn-primary btn-lg">
                Head Back Home
              </button>
            </Link>
          </h2>
        </div>
      </div>
    </div>
  )

  //   <h1>Sorry the page you're looking for doesn't exist</h1>

  // </div>
}

export default NoMatch
