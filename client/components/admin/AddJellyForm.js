import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCategories} from '../../store/jellies'
import axios from 'axios'

class AddJellyForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      price: '',
      inventory: '',
      categoryId: '',
      photo: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    const newJelly = this.state
    await axios.post('/api/jellies', newJelly)

    this.setState({
      name: '',
      description: '',
      price: '',
      inventory: '',
      category: '-',
      photo: ''
    })
  }

  render() {
    const {name, description, price, inventory} = this.state
    const isEnabled = name && description && price && inventory
    return (
      <div>
        <form>
          <h2>Add Jelly</h2>
          <label htmlFor="name">Jelly Name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
            required
          />
          <label htmlFor="price">Price: $</label>
          <input
            type="number"
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
            required
          />
          <label htmlFor="inventory">Inventory</label>
          <input
            type="number"
            name="inventory"
            value={this.state.inventory}
            onChange={this.handleChange}
            required
          />
          <p>Select Category</p>
          {/* <select
            name="categoryId"
            value={this.state.category}
            onChange={this.handleChange}
          >
            <option>-</option>
            {this.props.categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select> */}
          <select
            name="categoryId"
            value={this.state.category}
            onChange={this.handleCheckbox}
          >
            <option>-</option>
            {this.props.categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <label htmlFor="photo">Jelly Photo</label>
          <input
            type="url"
            name="photo"
            placeholder="http://example.com"
            value={this.state.photo}
            onChange={this.handleChange}
            required
          />
          <button
            type="submit"
            onClick={this.handleSubmit}
            disabled={!isEnabled}
            className={isEnabled ? 'enabled' : 'disabled'}
          >
            Add Jelly
          </button>
        </form>
      </div>
    )
  }
}

const mapState = ({jellies: {categories}}) => ({
  categories
})

const mapDispatch = {
  fetchCategories
}

export default connect(mapState, mapDispatch)(AddJellyForm)
