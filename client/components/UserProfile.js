import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUserProfile} from '../store'

class UserProfile extends Component {
  componentDidMount() {
    const userId = this.props.match.params.userId
    this.props.fetchUserProfile(userId)
  }

  render() {
    console.log('USER PROFILE', this.props.userProfile)
    const {name, avatar, reviews} = this.props.userProfile
    return (
      <div className="container">
        <div className="row px-3">
          <h1>HELLO WORLD</h1>
        </div>
      </div>
    )
  }
}
const mapState = ({user: {userProfile}}) => ({
  userProfile
})

const mapDispatch = dispatch => ({
  fetchUserProfile: userId => dispatch(fetchUserProfile(userId))
})

export default connect(mapState, mapDispatch)(UserProfile)
