import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AddJellyForm,
  JellyList,
  SingleJelly,
  AdminLanding,
  SingleReview,
  CartView
} from './components'
import {fetchUser, fetchCart} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div className="container">
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/admin/jellies/add" component={AddJellyForm} />
          <Route path="/admin" component={AdminLanding} />
          <Route
            path="/jellies/:jellyId/reviews/:reviewId"
            component={SingleReview}
          />
          <Route path="/jellies/:jellyId" component={SingleJelly} />
          <Route path="/jellies" component={JellyList} />
          <Route path='/cart' component={CartView} />

          {/* Routes placed here are only available after logging in */}
          {isLoggedIn && (
            <Switch>
              <Route path="/home" component={UserHome} />
            </Switch>
          )}

          {/* Displays Login component as our NoMatch fallback */}
          <Route component={Login} />
        </Switch>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.user.id,
    isAdmin: state.user.user.accessLevel >= 3
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(fetchUser())
      dispatch(fetchCart())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
