import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCategories} from '../../store'
import axios from 'axios'

class CreateProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      price: '',
      inventory: null,
      category: null,
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
    await axios.post('/api/products', this.state)

    this.setState({
      name: '',
      description: '',
      price: '',
      category: null,
      photo: ''
    })
  }

  render() {
    const {name, description, price, inventory} = this.state
    const isEnabled = name && description && price && inventory

    return (
      <div>
        <form>
          <h2>Add Product</h2>
          <label htmlFor="name">Product Name:</label>
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
          <label>Select Category</label>
          <select name="category" onChange={this.handleChange}>
            <option>-</option>
            {this.props.categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <label htmlFor="photo">Product Photo</label>
          <input
            type="url"
            name="photo"
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
            Add Product
          </button>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    categories: state.products.categories
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCategories: () => dispatch(fetchCategories())
  }
}

export default connect(mapState, mapDispatch)(CreateProduct)
