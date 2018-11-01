import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchReviews} from '../store'


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
      this.props.fetchReviews(latest.jellyId)
    }
  }

  render() {
    const keyedReviews = this.props.reviews
    const reviewsList = Object.keys(keyedReviews).map(key => keyedReviews[key])
    return reviewsList ? (
      reviewsList.map(review => (
        <div key={review.id}>
          <div>
            <h2>Reviewed by: {review.user.name}</h2>
            <img src={review.user.avatar} />
            <p>Rating: {review.starRating} / 5</p>
            <p>Review: {review.text}</p>
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
