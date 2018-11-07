import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUserProfile} from '../store'

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
    const {name, avatar, reviews} = this.props.userProfile
    // console.log('reviews', reviews)
    return (
      <div className="container">
        <div className="row p-3">
          <div className="col-2 col-md-2">
            <img src={avatar} avatar={name} />
          </div>
          <div className="col-9 col-md-9">
            <h1>Hello {name}</h1>
          </div>
        </div>
        <div className="row p-3">
          <div className="col">
            <h2>Reviews</h2>
          </div>
        </div>
        {reviews ? (
          reviews.map(userReview => (
            <div key={userReview.id}>
              <div className="row p-3">
                <div className="col-3 col-md-3">
                  {/* <Link to="/jellies/12"> */}
                  <div className="card">
                    <img
                      className="card-img-top"
                      src="..."
                      alt="Card image cap"
                    />
                    <div className="card-body">
                      <h5 className="card-title">Card title</h5>
                    </div>
                  </div>
                  {/* </Link> */}
                </div>
                <div className="col-9 col-md-9">
                  <h3>{userReview.title}</h3>
                  <p>
                    <strong>
                      {this.showStarRating(userReview.starRating)} -{' '}
                      {userReview.date}
                    </strong>
                  </p>
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
