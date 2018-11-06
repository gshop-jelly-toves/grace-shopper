import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {fetchSingleJelly, addJellyById} from '../store'
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
          <Fragment>
            <div className="row p-3">
              <div className="col col-lg-5">
                <img src={jelly.photo} alt={jelly.name} />
              </div>
              <div className="col col-lg-7">
                <h2>{jelly.name}</h2>

                <h4>{priceCentsToString(jelly.priceCents)}</h4>

                <p>{jelly.rating} ★</p>
                <p>{jelly.description}</p>
                <label htmlFor="quantity">Quantity</label>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon3">
                      {jelly.inventory} remaining
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="basic-url"
                    aria-describedby="basic-addon3"
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-success btn-block"
                  onClick={this.addToCart}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
            <div className="row p-3 align-items-center">
              <div className="col">
                <h2>Reviews</h2>
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
                className="btn btn-secondary"
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
            {/*
       __     ____      ____            _
      / /__  / / /_  __/ __ \___ _   __(_)__ _      _______
 __  / / _ \/ / / / / / /_/ / _ \ | / / / _ \ | /| / / ___/
/ /_/ /  __/ / / /_/ / _, _/  __/ |/ / /  __/ |/ |/ (__  )
\____/\___/_/_/\__, /_/ |_|\___/|___/_/\___/|__/|__/____/
              /____/
            */}
            <JellyReviews jellyId={this.props.match.params.jellyId} />
          </Fragment>
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
  // reviews /* to access reviews.length */,
  isAdmin: user.accessLevel >= 3,
  isLoggedIn: user.accessLevel >= 1
})

const mapDispatch = dispatch => ({
  fetchSingleJelly: jellyId => dispatch(fetchSingleJelly(jellyId)),
  addToCart: jellyId => dispatch(addJellyById(jellyId))
})

export default connect(mapState, mapDispatch)(SingleJelly)
