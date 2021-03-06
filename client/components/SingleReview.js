import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleReview} from '../store'
import {Link} from 'react-router-dom'
import NoMatch from './NoMatch'

class SingleReview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false
    }
    this.doneEditing = this.doneEditing.bind(this)
  }

  doneEditing() {
    this.setState({editing: false})
    const jellyId = this.props.match.params.jellyId
    const reviewId = this.props.match.params.reviewId
    this.props.fetchSingleReview(jellyId, reviewId)
  }

  componentDidMount() {
    const jellyId = this.props.match.params.jellyId
    const reviewId = this.props.match.params.reviewId
    this.props.fetchSingleReview(jellyId, reviewId)
  }

  componentDidUpdate(prevProps) {
    const latestJelly = this.props.match.params.jellyId
    const prevJelly = prevProps.match.params.jellyId

    const latestReview = this.props.match.params.reviewId
    const prevReview = prevProps.match.params.reviewId

    if (prevJelly !== latestJelly || latestReview !== prevReview) {
      this.props.fetchSingleJelly(latestJelly, latestReview)
    }
  }

  render() {
    const {isAdmin} = this.props
    const {isLoggedIn} = this.props
    const {editing} = this.state
    const review = this.props.singleReview

    return review.id ? (
      <div>
        <Link to={`/jellies/${review.jellyId}/reviews/${review.id}`}>
          <h2>{review.title}</h2>
        </Link>
        <div>
          <h4 onClick={() => this.props.history.push(`/users/${review.user.id}`)} >Review by: {review.user.name}</h4>
          <img onClick={() => this.props.history.push(`/users/${review.user.id}`)} src={review.user.avatar} />
          <p>Rating: {review.starRating} / 5</p>
          <p>{review.body}</p>
        </div>
        {isAdmin && (
          <button
            type="button"
            onClick={() => {
              this.setState({editing: true})
            }}
          >
            EDIT REVIEW
          </button>
        )}
      </div>
    ) : (
      <div />
    )
  }
}

const mapState = state => {
  return {
    singleReview: state.reviews.singleReview,
    isAdmin: state.user.user.accessLevel >= 3,
    isLoggedIn: state.user.user.accessLevel >= 1
  }
}

const mapDispatch = dispatch => ({
  fetchSingleReview: (jellyId, reviewId) =>
    dispatch(fetchSingleReview(jellyId, reviewId))
})

export default connect(mapState, mapDispatch)(SingleReview)
