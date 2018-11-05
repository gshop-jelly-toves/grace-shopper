import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setSearch} from '../store'

class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch(event) {
    this.props.setSearch(event.target.value)
  }

  render() {
    const {categories} = this.props

    return (
      <form>
        <input
          className="form-control"
          type="search"
          name="search"
          placeholder="ready for this jelly?"
          aria-label="Search"
          onChange={this.handleSearch}
        />
      </form>
    )
  }
}

const mapDispatch = dispatch => ({
  setSearch: search => dispatch(setSearch(search))
})

export default connect(null, mapDispatch)(SearchBar)
