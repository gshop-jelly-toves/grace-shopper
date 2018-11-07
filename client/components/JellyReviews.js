import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchReviews} from '../store'
import {Link} from 'react-router-dom'

class JellyReviews extends Component {
  // constructor(props) {
  //   super(props)
  // }

  componentDidMount() {
    const jellyId = this.props.jellyId
    this.props.fetchReviews(jellyId)
  }

  componentDidUpdate(prevProps) {
    const latest = this.props.jellyId
    const prev = prevProps.jellyId
    if (prev !== latest) {
      this.props.fetchReviews(latest)
    }
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
    const keyedReviews = this.props.reviews
    const reviewsList = Object.keys(keyedReviews).map(key => keyedReviews[key])
    return reviewsList.length ? (
      reviewsList.map((
        review // <Fragment> // The main <div> there is a container with classes row p-3 // Keep in mind that this renders on the SingleJelly page
      ) => (
        <div key={review.id}>
          <div className="row p-3 border-top">
            <div className="col">
              <h2>
                {this.showStarRating(review.starRating)}
                {'  '}
                {review.title}
              </h2>
            </div>
          </div>
          <div className="row px-3 align-items-center">
            <div className="col-1 col-md-1">
              <img src={review.user.avatar} className="rounded-circle" />
            </div>
            <div className="col-11 col-md-11">
              <Link to={`/users/${review.userId}`}>
                <h4>{review.user.name}</h4>
              </Link>
            </div>
          </div>
          <div className="row p-3">
            <div className="col">
              <p>{review.body}</p>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="row px-3">
        <div className="col">
          <h4>This product has no reviews - be the first!</h4>
        </div>
      </div>
    )
  }
}

const mapState = ({reviews: {reviews}}) => ({
  reviews
})

const mapDispatch = dispatch => ({
  fetchReviews: jellyId => dispatch(fetchReviews(jellyId))
})

export default connect(mapState, mapDispatch)(JellyReviews)
