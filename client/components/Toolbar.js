import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setSearch, setCategory, fetchCategories} from '../store'

class SearchBar extends Component {

  componentDidMount() {
    this.props.fetchCategories()
  }

  handleCategory = (event) => {
    this.props.setCategory(event.target.value)
  }

  handleSearch = (event) => {
    this.props.setSearch(event.target.value)
  }

  render() {
    return (
      <div>
        <form className="form-group">
          <input
            className="form-control form-control-lg"
            type="search"
            name="search"
            placeholder="What's your jam today?"
            aria-label="Search"
            onChange={this.handleSearch}
          />
        </form>

        {/* <label>Select Category</label>
        <select name="selectCategory" onChange={this.handleCategory}>
          <option>-</option>
          {this.props.categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select> */}
      </div>
    )
  }
}

const mapState = state => ({
  categories: state.jellies.categories
})

const mapDispatch = dispatch => ({
  setSearch: search => dispatch(setSearch(search)),
  setCategory: category => dispatch(setCategory(category)),
  fetchCategories: () => dispatch(fetchCategories())
})

export default connect(mapState, mapDispatch)(SearchBar)
