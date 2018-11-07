import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUserProfile} from '../store'
import {Link} from 'react-router-dom'

class UserProfile extends Component {
  componentDidMount() {
    const userId = this.props.match.params.userId
    this.props.fetchUserProfile(userId)
  }

  showStarRating = number => {
    let starStr = ''

    // Add starRating num of stars
    for (let i = 1; i <= number; i++) {
      starStr += '★'
    }

    // Add blank stars if less than 5
    while (starStr.length < 5) {
      starStr += '☆'
    }

    return starStr
  }

  render() {
    // console.log(this.props.userProfile)
    const {name, reviews} = this.props.userProfile
    // const numReviews = reviews.length
    // console.log(numReviews)
    // console.log('reviews', reviews)
    return (
      <div className="container">
        <div className="row p-4">
          <div className="col-3 col-md-3">
            <img
              src="https://dummyimage.com/220x220/cccccc/000147.png&text=UserPhoto"
              avatar={name}
            />
          </div>
          <div className="col-9 col-md-9">
            <h1>{name}</h1>
            <h3>JT Collective Lifetime Member</h3>
            <h5>Jammin' Out with us since September 10, 2018 </h5>
            {/* <h3>{numReviews} reviews</h3> */}
          </div>
        </div>
        <div className="row p-4">
          <div className="col">
            <h2>{name}'s Product Reviews</h2>
          </div>
        </div>
        {reviews ? (
          reviews.map(userReview => (
            <div key={userReview.id}>
              <div className="row p-4">
                <div className="col-3 col-md-3">
                  <Link to={`/jellies/${userReview.jellyId}`}>
                    <div className="card">
                      <img
                        className="card-img-top"
                        src="https://dummyimage.com/250x180/000147/ffffff.png&text=JellyPic"
                        alt="Jelly picture"
                      />
                      <div className="card-body text-center">
                        {/* <h5 className="card-title">Jelly Name w/Link</h5> */}
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-9 col-md-9">
                  <h3>{userReview.title}</h3>
                  <p>
                    <strong>
                      {this.showStarRating(userReview.starRating)} -{' '}
                      {userReview.date}
                    </strong>
                  </p>
                  <p>{userReview.body}</p>
                  <p>
                    <strong />
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No reviews here!</p>
        )}
      </div>
    )
  }
}
const mapState = ({user: {userProfile}}) => ({
  userProfile
})

const mapDispatch = dispatch => ({
  fetchUserProfile: userId => dispatch(fetchUserProfile(userId))
})

export default connect(mapState, mapDispatch)(UserProfile)
