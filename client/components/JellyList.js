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
    const {search} = this.props
    const keyedJellies = this.props.jellies
    const {category} = this.props.selectedCategory

    const jelliesList = Object.keys(keyedJellies)
      .map(key => keyedJellies[key])
      .sort(function(a, b) {
        if (a.rating > b.rating) return -1
        if (a.rating < b.rating) return 1
        return 0
      })

    const searchFilter = jellyArr =>
      search === ''
        ? jellyArr
        : [...jellyArr].filter(
            jelly => jelly.name.toLowerCase().indexOf(search.toLowerCase()) > -1
          )

    // const categoryFilter = jellyArr =>
    //   category === ''
    //     ? jellyArr
    //     : [...jellyArr].filter(
    //       jelly =>
    //         jelly.name.indexOf(search.toLowerCase()) > -1
    //     )

    return (
      <div className="d-flex flex-wrap" id="jellyList">
        {searchFilter(jelliesList).map(jelly => (
          <div className="mx-auto p-3" key={jelly.id}>
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

const mapState = ({
  jellies: {jellies},
  jellies: {search},
  jellies: {selectedCategory}
}) => ({
  jellies,
  search,
  selectedCategory
})

const mapDispatch = dispatch => ({
  fetchJellies: (index, amount) => dispatch(fetchJellies(index, amount))
})

export default connect(mapState, mapDispatch)(JellyList)
