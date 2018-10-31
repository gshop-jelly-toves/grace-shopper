import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchJellys} from '../store'

class JellyList extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchJellys()
  }

  render() {
    const keyedJellys = this.props.jellys
    const jellysList = Object.keys(keyedJellys)
      .map( key => keyedJellys[key] )

    return (
      <div id="jellyList">
        { jellysList.map(jelly => (
          <div key={jelly.id}>
            <Link to={`/jellys/${jelly.id}`}>
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

const mapState = ({ jellys: {jellys} }) => ({
  jellys
})

const mapDispatch = { fetchJellys }

export default connect(mapState, mapDispatch)(JellyList)
