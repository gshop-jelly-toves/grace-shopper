import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCategories, setCategory} from '../store'

class Toolbar extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  handleChange(event) {
    this.props.setCategory({
      category: event.target.value
    })
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
