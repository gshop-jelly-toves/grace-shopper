import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUserProfile} from '../store/'
import {Link} from 'react-router-dom'

class UserProfile extends Component {
  componentDidMount() {
    const userId = this.props.match.params.userId
    this.props.fetchUserProfile(userId)
  }

  render() {
    // console.log(this.props.userProfile)
    const {name, avatar, reviews} = this.props.userProfile
    console.log('reviews', reviews)
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
                    <img className="card-img-top" src="" alt="Card image cap" />
                    <div className="card-body">
                      <h5 className="card-title">Card title</h5>
                      <p className="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                    </div>
                  </div>
                  {/* </Link> */}
                </div>
                <div className="col-9 col-md-9">
                  <h3>{userReview.title}</h3>

                  {/* {for (let i = 0; i < user.Re)} */}
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

/* {reviews.map(oneReview => (
          <div key={oneReview.id}>
            <div className="row px-3">
              <div className="col">
                <h2>{oneReview.title}</h2>
              </div>
            </div>
            <div className="row px-3 align-items-center">
              <div className="col-1 col-md-1">
                <img src={oneReview.user.avatar} className="rounded-circle" />
              </div>
              <div className="col-11 col-md-11">
                <h4>Review by: {oneReview.user.name}</h4>
              </div>
            </div>
            <div className="row p-3">
              <div className="col">
                <p>Rating: {oneReview.starRating} / 5 ★</p>
                <p>{oneReview.body}</p>
              </div>
            </div>
          </div>
        ))} */

const mapState = ({user: {userProfile}}) => ({
  userProfile
})

const mapDispatch = dispatch => ({
  fetchUserProfile: userId => dispatch(fetchUserProfile(userId))
})

export default connect(mapState, mapDispatch)(UserProfile)
