import React from 'react'

const Search = props => (
  <form>
    <input
      type="text"
      name="search"
      placeholder="search jellies"
      onChange={props.handleSearch}
    />
    <button type="submit" value="submit" onClick={props.handleSubmit}>
      Search
    </button>
  </form>
)

export default Search
