import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleJelly} from '../store'
import {addJellyById} from '../store'
import NoMatch from './NoMatch'
import EditJellyForm from './admin/EditJellyForm'
import JellyReviews from './JellyReviews'
import AddReviewForm from './AddReviewForm'
import {priceCentsToString} from '../utils'

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

    // console.log('USER', this.props.user)

    const {jellyId} = this.props.match.params
    const jelly = this.props.jellies[jellyId]

    return jelly ? (
      <div className="container">
        {editing && isAdmin ? (
          <EditJellyForm done={this.doneEditing} />
        ) : (
          <div>
            <div className="row p-3">
              <div className="col col-lg-8">
                <img src={jelly.photo} alt={jelly.name} />
              </div>
              <div className="col col-lg-4">
                <h2>{jelly.name}</h2>

                <h4>{priceCentsToString(jelly.priceCents)}</h4>

                <p>Rating: {jelly.rating} ★</p>
                <p>{jelly.inventory} remaining</p>
                <p>{jelly.description}</p>
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={this.addToCart}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
            {isAdmin && (
              <button
                type="button"
                className="btn btn-secondary"
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

const mapState = ({jellies: {jellies}, user: {user}}) => ({
  jellies,
  user,
  isAdmin: user.accessLevel >= 3,
  isLoggedIn: user.accessLevel >= 1
})

const mapDispatch = dispatch => ({
  fetchSingleJelly: jellyId => dispatch(fetchSingleJelly(jellyId)),
  addToCart: jellyId => dispatch(addJellyById(jellyId))
})

export default connect(mapState, mapDispatch)(SingleJelly)
