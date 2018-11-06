import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setSearch, fetchJellies} from '../store'

class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.handleSearch = this.handleSearch.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  handleSearch(event) {
    this.props.setSearch(event.target.value)
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.fetchJellies(0, -1)
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
            type="submit"
            className="btn btn-lg btn-block btn-outline-primary"
            onClick={this.onSubmit}
          >
            Search
          </button>
        </div>
      </div>
    )
  }
}

const mapState = ({jellies: {search}}) => ({
  search
})

const mapDispatch = dispatch => ({
  setSearch: search => dispatch(setSearch(search)),
  fetchJellies: (index, amount) => dispatch(fetchJellies(index, amount))
})

export default connect(mapState, mapDispatch)(SearchBar)
