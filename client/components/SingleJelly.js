import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleJelly} from '../store'
import {addJellyById} from '../store'
import NoMatch from './NoMatch'
import EditJellyForm from './admin/EditJellyForm'
import JellyReviews from './JellyReviews'
import AddReviewForm from './AddReviewForm'

class SingleJelly extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      reviewing: false
    }
    this.doneEditing = this.doneEditing.bind(this)
    this.doneReviewing = this.doneReviewing.bind(this)
  }

  doneEditing() {
    this.setState({editing: false})
    const jellyId = this.props.match.params.jellyId
    this.props.fetchSingleJelly(jellyId)
  }

  addToCart = () => {
    this.props.addToCart(this.props.match.params.jellyId)
  }

  doneReviewing() {
    this.setState({reviewing: false})
    const jellyId = this.props.match.params.jellyId
    this.props.fetchSingleJelly(jellyId)
  }

  componentDidMount() {
    const jellyId = this.props.match.params.jellyId
    this.props.fetchSingleJelly(jellyId)
  }

  componentDidUpdate(prevProps) {
    const latest = this.props.match.params.jellyId
    const prev = prevProps.match.params.jellyId
    if (prev !== latest) {
      this.props.fetchSingleJelly(latest)
    }
  }

  render() {
    const {editing} = this.state
    const {reviewing} = this.state
    const {isAdmin} = this.props
    const {isLoggedIn} = this.props

    console.log('USER', this.props.user)

    const jelly = this.props.singleJelly

    return jelly ? (
      <div>
        {editing && isAdmin ? (
          <EditJellyForm done={this.doneEditing} />
        ) : (
          <div>
            <h2>{jelly.name}</h2>
            <img src={jelly.photo} />
            <p>${jelly.price}</p>
            <button
                type="button"
                onClick={this.addToCart}
              >
                ADD TO CART
              </button>



            <p>Rating: {jelly.rating}/5</p>
            <p>{jelly.inventory} remaining</p>
            <p>Description: {jelly.description}</p>

            {isAdmin && (
              <button
                type="button"
                onClick={() => {
                  this.setState({editing: true})
                }}
              >
                EDIT JELLY
              </button>
            )}

            {isLoggedIn && (
              <button
                type="button"
                onClick={() => {
                  this.setState({reviewing: true})
                }}
              >
                ADD REVIEW
              </button>
            )}

            {isLoggedIn &&
              reviewing && (
                <AddReviewForm
                  jellyId={this.props.match.params.jellyId}
                  userId={this.props.user.id}
                  done={this.doneReviewing}
                />
              )}

            <JellyReviews jellyId={this.props.match.params.jellyId} />
          </div>
        )}
      </div>
    ) : (
      <NoMatch />
    )
  }
}

const mapState = ({jellies: {singleJelly}, user: {user}}) => ({
  singleJelly,
  user,
  isAdmin: user.accessLevel >= 3,
  isLoggedIn: user.accessLevel >= 1
})

const mapDispatch = dispatch => ({
  fetchSingleJelly: jellyId => dispatch(fetchSingleJelly(jellyId)),
  addToCart: jellyId => dispatch(addJellyById(jellyId))
})

export default connect(mapState, mapDispatch)(SingleJelly)
