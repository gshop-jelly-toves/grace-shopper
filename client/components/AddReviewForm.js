import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import { fetchReviews } from '../store';

class AddReviewForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      starRating: ''
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSaveRedirect = async event => {
    event.preventDefault()
    const jellyId = this.props.jellyId
    const newReview = this.state
    newReview.jellyId = jellyId
    newReview.userId = this.props.user.id

    const {data} = await axios.post(
      `/api/jellies/${jellyId}/reviews`,
      newReview
    )

    this.props.fetchReviews(jellyId)
    this.props.done()
  }

  render() {
    const {text, starRating} = this.state
    const isEnabled = text && starRating

    return (
      <div>
        <form id="add-review-form">
          <label htmlFor="name">Add Review</label>
          <input
            type="text"
            name="text"
            value={this.state.text}
            onChange={this.handleChange}
            required
          />

          <label>Add Rating</label>
          <select
            name="starRating"
            onChange={this.handleChange}
            value={this.state.starRating}
          >
            <option>-</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
          <button
            type="submit"
            onClick={this.handleSaveRedirect}
            disabled={!isEnabled}
            className={isEnabled ? 'enabled' : 'disabled'}
          >
            Save Review
          </button>
        </form>
      </div>
    )
  }
}

const mapState = ({user: {user}}) => ({
  user
})

const mapDispatch = dispatch => ({
  fetchReviews: jellyId => dispatch(fetchReviews(jellyId))
})

export default connect(mapState, mapDispatch)(AddReviewForm)
