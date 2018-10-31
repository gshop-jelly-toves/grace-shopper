import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleJelly} from '../store'
import NoMatch from './NoMatch'

class SingleJelly extends Component {
  constructor(props) {
    super(props)
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
    const jelly = this.props.singleJelly
    return jelly ? (
      <div>
        <div>
          <h2>{jelly.name}</h2>
          <img src={jelly.photo} />
          <h4>Inventory: {jelly.inventory}</h4>
          <p>Rating: {jelly.rating} / 5</p>
          <p>Description: {jelly.description}</p>
        </div>
      </div>
    ) : (
      <NoMatch />
    )
  }
}

const mapState = ({ jellies: {singleJelly} }) => ({
  singleJelly
})

const mapDispatch = dispatch => ({
  fetchSingleJelly: jellyId => dispatch( fetchSingleJelly(jellyId) )
})

export default connect(mapState, mapDispatch)(SingleJelly)
