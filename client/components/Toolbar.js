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
    return (
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
    )
  }
}

const mapDispatch = dispatch => ({
  setSearch: search => dispatch(setSearch(search))
})

export default connect(null, mapDispatch)(SearchBar)
