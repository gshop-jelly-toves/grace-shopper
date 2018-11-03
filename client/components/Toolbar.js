import React, {Component} from 'react'
import {connect} from 'react-redux'

import {fetchCategories, setCategory, setSearch} from '../store'

class Toolbar extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  handleChange(event) {
    this.props.setCategory({
      category: event.target.value
    })
  }

  handleSearch(event) {
    this.props.setSearch(event.target.value)
  }

  render() {
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
          <label>SEARCH JELLIES</label>
          <input type="text" name="search" onChange={this.handleSearch} />
        </form>
      </div>
    )
  }
}

// DO NOT TOUCH
const mapState = ({jellies: {categories}, jellies: {selectedCategory}}) => ({
  categories,
  selectedCategory
})

const mapDispatch = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  setCategory: category => dispatch(setCategory(category)),
  setSearch: search => dispatch(setSearch(search))
})

export default connect(mapState, mapDispatch)(Toolbar)
