import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchJellies} from '../store'

class JellyList extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchJellies()
  }

  render() {
    const keyedJellies = this.props.jellies
    const jelliesList = Object.keys(keyedJellies)
      .map( key => keyedJellies[key] )

    return (
      <div id="jellyList">
        { jelliesList.map(jelly => (
          <div key={jelly.id}>
            <Link to={`/jellies/${jelly.id}`}>
              <img src={jelly.photo} />
              <h3>{jelly.name}</h3>
              <p>${jelly.price}</p>
            </Link>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = ({ jellies: {jellies} }) => ({
  jellies
})

const mapDispatch = { fetchJellies }

export default connect(mapState, mapDispatch)(JellyList)
