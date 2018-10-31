import React, {Component} from 'react'
import Search from './Search'
import {connect} from 'react-redux'

import {fetchCategories, setCategory} from '../store'

class Toolbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
      [e.target.name]: e.target.value
    })
    console.log('/////', this.state)
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log('/////SUBMIT/////', this.state.search)
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
        <Search
          {...this.props}
          handleSearch={this.handleSearch}
          handleSubmit={this.handleSubmit}
        />
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
