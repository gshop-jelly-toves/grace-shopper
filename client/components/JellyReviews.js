import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchReviews} from '../store'
import { Link } from 'react-router-dom'


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
      reviewsList.map(review => (
        <Link to={`/jellies/${review.jellyId}/reviews/${review.id}`} key={review.id}>
          <div>
            <h2>Reviewed by: {review.user.name}</h2>
            <img src={review.user.avatar} />
            <p>Rating: {review.starRating} / 5</p>
            <p>Review: {review.text}</p>
          </div>
        </Link>
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
