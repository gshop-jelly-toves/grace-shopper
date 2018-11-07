import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchReviews} from '../store'
import {Link, withRouter} from 'react-router-dom'

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
    return reviewsList.length ? ( // The main <div> there is a container with classes row p-3 // Keep in mind that this renders on the SingleJelly page
      // <Fragment>
      reviewsList.map(review => (
        <div key={review.id}>
          <div className="row px-3">
            <div className="col">
              <Link to={`/jellies/${review.jellyId}/reviews/${review.id}`}>
                <h2>{review.title}</h2>
              </Link>
            </div>
          </div>
          <div className="row px-3 align-items-center">
            <div className="col-1 col-md-1">
              <img onClick={() => this.props.history.push(`/users/${review.user.id}`)} src={review.user.avatar} className="rounded-circle" />
            </div>
            <div className="col-11 col-md-11">
              <h4 onClick={() => this.props.history.push(`/users/${review.user.id}`)}>Review by: {review.user.name}</h4>
            </div>
          </div>
          <div className="row p-3">
            <div className="col">
              <p>Rating: {review.starRating} / 5 ★</p>
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

export default withRouter(connect(mapState, mapDispatch)(JellyReviews))
