import React from 'react'
import {Link} from 'react-router-dom'

const NoMatch = () => {
  return (
    <div className="d-flex flex-row align-items-center" id="error-cat">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 text-center">
            <img src="./ErrorHoneyCat.jpg" alt="ErrorHoneyCat" />
            {/* <span className="display-1 d-block">404</span> */}
            {/* <div className="mb-4 lead">
              The page you are looking for was not found.
            </div> */}
            <a className="btn btn-link">
              <Link to="/home">Back to Home</Link>
            </a>
          </div>
        </div>
      </div>
    </div>

    //   <h1>Sorry the page you're looking for doesn't exist</h1>

    // </div>
  )
}

export default NoMatch
