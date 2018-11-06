import React, {Component, Fragment} from 'react'
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

  render() {
    const keyedReviews = this.props.reviews
    const reviewsList = Object.keys(keyedReviews).map(key => keyedReviews[key])
    return keyedReviews ? (
      // Keep in mind that this renders on the SingleJelly page
      // The main <div> there is a container with classes row p-3

      reviewsList.map(review => (
        <div key={review.id}>
          <Link to={`/jellies/${review.jellyId}/reviews/${review.id}`}>
            <h2>{review.title}</h2>
          </Link>
          <div>
            <h4>Review by: {review.user.name}</h4>
            <img src={review.user.avatar} className="rounded-circle" />
            <p>Rating: {review.starRating} / 5</p>
            <p>{review.body}</p>
          </div>
        </div>
      ))
    ) : (
      <p>This product has no reviews!</p>
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
