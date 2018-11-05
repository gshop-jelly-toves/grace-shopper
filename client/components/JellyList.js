import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchJellies} from '../store'
import {addJellyById} from '../store'
import {priceCentsToString} from '../utils'

class JellyList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //  Changed to 6 from 10 b/c:
      //    6 % 2 === 0
      //    6 % 3 === 0
      //  6 jellies in 2 rows is essentially a full screen height
      jelliesPerReq: 6
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
      <Fragment>
        <div className="d-flex flex-wrap" id="jellyList">
          {searchFilter(jelliesList).map(jelly => (
            <div className="mx-auto p-5" key={jelly.id}>
              <Link to={`/jellies/${jelly.id}`}>
                <img src={jelly.photo} />
                <h3>{jelly.name}</h3>
              </Link>
              <button
                type="button"
                onClick={() => this.props.addToCart(jelly.id)}
              >
                ADD TO CART
              </button>
              <Link to={`/jellies/${jelly.id}`}>
                <p>{jelly.rating} ★</p>
                <p>{priceCentsToString(jelly.priceCents)}</p>
              </Link>
            </div>
          ))}
        </div>
        <div className="row justify-content-center">
          <button
            type="button"
            className="btn btn-lg btn-primary mb-5"
            onClick={() => this.props.fetchJellies(jelliesList.length, amount)}
          >
            SEE MORE JELLIES
          </button>
        </div>
      </Fragment>
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
  fetchJellies: (index, amount) => dispatch(fetchJellies(index, amount)),
  addToCart: jellyId => dispatch(addJellyById(jellyId))
})

export default connect(mapState, mapDispatch)(JellyList)
