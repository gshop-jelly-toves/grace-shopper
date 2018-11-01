import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleJelly} from '../store'
import NoMatch from './NoMatch'
import EditJellyForm from './admin/EditJellyForm'
import JellyReviews from './JellyReviews'

class SingleJelly extends Component {
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
    const {isAdmin} = this.props
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
            <p>Rating: {jelly.rating}/5</p>
            <p>{jelly.inventory} remaining</p>
            <p>Description: {jelly.description}</p>

            {isAdmin && (
              <button
                onClick={() => {
                  this.setState({editing: true})
                }}
              >
                EDIT JELLY
              </button>
            )}

            <JellyReviews jellyId={this.props.match.params.jellyId}/>
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
  isAdmin: user.accessLevel >= 3
})

const mapDispatch = dispatch => ({
  fetchSingleJelly: jellyId => dispatch(fetchSingleJelly(jellyId))
})

export default connect(mapState, mapDispatch)(SingleJelly)
