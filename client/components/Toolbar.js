import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCategories} from '../store'

class Toolbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: ''
    }
  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  handleChange(event) {
    this.setState({
      category: event.target.value
    })
    console.log('LOCAL STATE BELOW\n', this.state)
  }

  render() {
    // const keyedJellies = this.props.jellies
    // const jelliesList = Object.keys(keyedJellies).map(key => keyedJellies[key])

    const {categories} = this.props

    return (
      <div id="toolbar">
        <select>
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
const mapState = ({jellies: {categories}}) => ({
  categories
})

const mapDispatch = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories())
})

export default connect(mapState, mapDispatch)(Toolbar)
