import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchJellies} from '../store'

class JellyList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      jelliesPerReq: 10
    }
  }

  componentDidMount() {
    const amount = this.state.jelliesPerReq
    this.props.fetchJellies(0, amount)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const amount = this.state.jelliesPerReq
    const search = this.props.search
    const keyedJellies = this.props.jellies
    console.log('...', search)

    const searchFilter = jellyArr => {
      if (!search) {
        return jellyArr
      } else {
        return (
          jellyArr
            // .map(jel => jel.name.toLowerCase())
            .filter(j => j.name.indexOf(search.search.toLowerCase()) !== -1)
        )
      }
    }

    const jelliesList = Object.keys(keyedJellies)
      .map(key => keyedJellies[key])
      .sort(function(a, b) {
        if (a.rating > b.rating) return -1
        if (a.rating < b.rating) return 1
        return 0
      })

    const searchJellies = searchFilter(jelliesList)
    console.log(searchJellies)

    return (
      <div id="jellyList">
        {searchFilter(jelliesList).map(jelly => (
          <div key={jelly.id}>
            <Link to={`/jellies/${jelly.id}`}>
              <img src={jelly.photo} />
              <h3>{jelly.name}</h3>
              <p>{jelly.rating}/5</p>
              <p>{jelly.price}</p>
            </Link>
          </div>
        ))}

        <button
          onClick={() => this.props.fetchJellies(jelliesList.length, amount)}
        >
          MORE JELLIES
        </button>
      </div>
    )
  }
}

const mapState = ({jellies: {jellies}, jellies: {search}}) => ({
  jellies,
  search
})

const mapDispatch = dispatch => ({
  fetchJellies: (index, amount) => dispatch(fetchJellies(index, amount))
})

export default connect(mapState, mapDispatch)(JellyList)
