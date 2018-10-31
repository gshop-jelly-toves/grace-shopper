import React, {Component} from 'react'
import {connect} from 'react-redux'

import {fetchCategories, setCategory} from '../store'

class Toolbar extends Component {
  constructor(props) {
    super(props)
<<<<<<< HEAD
    this.state = {
      category: '',
      search: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
=======

    this.handleChange = this.handleChange.bind(this)

>>>>>>> master
  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  handleChange(event) {
    this.props.setCategory({
      category: event.target.value
    })

  }

  handleSearch(e) {
    this.setState({
      search: e.target.value
    })
  }

  handleSearch(e) {
    e.preventDefault()
    console.log('//////', this.state.search)
  }

  render() {
    // const keyedJellies = this.props.jellies
    // const jelliesList = Object.keys(keyedJellies).map(key => keyedJellies[key])

    const {categories} = this.props

    return (
      <div id="toolbar">

        <select onChange={this.handleChange}>

          <option>Choose Category</option>
          {categories.map(category => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <form>
          <input
            type="text"
            placeholder="search jellies"
            onChange={this.handleSearch}
            value={this.state.search}
          />
          <button type="submit" value="submit" onClick={this.handleSubmit}>
            Search
          </button>
        </form>
      </div>
    )
  }
}

// DO NOT TOUCH
const mapState = ({jellies: {categories}, user: {selectedCategory}}) => ({
  categories,
  selectedCategory
})

const mapDispatch = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  setCategory: category => dispatch(setCategory(category))

})

export default connect(mapState, mapDispatch)(Toolbar)
