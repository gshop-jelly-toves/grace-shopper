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
      <div>
        <form className="input-group mb-3">
          <input
            className="form-control form-control-lg"
            type="search"
            name="search"
            placeholder="What's your jam today?"
            aria-label="Search"
            onChange={this.handleSearch}
          />
        </form>
        <div className="input-group-append">
          <button
            type="button"
            className="btn btn-lg btn-block btn-outline-primary"
          >
            Search
          </button>
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  setSearch: search => dispatch(setSearch(search))
})

export default connect(null, mapDispatch)(SearchBar)
