import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchJellies} from '../store'

class JellyList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categoryId: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchJellies()
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
      //filter here
    })
  }

  render() {
    const keyedJellies = this.props.jellies
    const jelliesList = Object.keys(keyedJellies).map(key => keyedJellies[key])

    console.log('Jellies list below\n')
    console.log(jelliesList)
    console.log('######################')

    return (
      <div id="jellyList">
        {/* <div>
          <label>Select Category</label>
          <select
            name="categoryId"
            value={this.state.category}
            onChange={this.handleChange}
          >
            <option>-</option>
            {this.props.categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div> */}
        {jelliesList.map(jelly => (
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

const mapState = ({jellies: {jellies}}) => ({
  jellies
})

const mapDispatch = {fetchJellies}

export default connect(mapState, mapDispatch)(JellyList)
