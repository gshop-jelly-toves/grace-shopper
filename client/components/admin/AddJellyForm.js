import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCategories} from '../../store/jellies'
import axios from 'axios'
import CheckboxCategory from './CheckboxCategory'

class AddJellyForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      price: '',
      inventory: '',
      categoryIds: [],
      photo: ''
    }
  }

  UNSAFE_componentWillMount = () => {
    this.selectedCheckboxes = new Set()
  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // toggleCheckbox = checkbox => {
  //   if (this.selectedCheckboxes.has(checkbox)) {
  //     this.selectedCheckboxes.delete(checkbox)

  //     let array = [...this.state.categoryIds]
  //     let index = array.indexOf(checkbox.id)
  //     array.splice(index, 1)

  //     this.setState({categoryIds: array})
  //   } else {
  //     this.selectedCheckboxes.add(checkbox)
  //     this.setState(prevState => ({
  //       categoryIds: [...prevState.categoryIds, checkbox.id]
  //     }))
  //   }
  // }

  toggleCheckbox = (checkbox) => {
    if (this.selectedCheckboxes.has(checkbox)) {
      this.selectedCheckboxes.delete(checkbox)

      let array = [...this.state.categoryIds]
      let index = array.indexOf(checkbox.id)
      array.splice(index, 1)

      this.setState({categoryIds: array})
    } else {
      this.selectedCheckboxes.add(checkbox)
      this.setState(prevState => ({
        categoryIds: [...prevState.categoryIds, checkbox.id]
      }))
    }
    console.log('ONE CHECKBOX', this.selectedCheckboxes)
  }

  handleAddAnother = async event => {
    event.preventDefault()
    const newJelly = this.state
    await axios.post('/api/jellies', newJelly)

    console.log('ENTIRE SET', this.selectedCheckboxes)
    // this.selectedCheckboxes.forEach(e => e.delete(e))
    // console.log(this.selectedCheckboxes)

    this.setState({
      name: '',
      description: '',
      price: '',
      inventory: '',
      categoryIds: [],
      photo: ''
    })
  }

  handleSaveRedirect = async event => {
    event.preventDefault()
    const newJelly = this.state
    const {data} = await axios.post('/api/jellies', newJelly)

    this.props.history.push(`/jellies/${data.id}`)
  }

  render() {
    const {name, description, price, inventory} = this.state
    const isEnabled = name && description && price && inventory
    console.log(this.state)

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
          <label htmlFor="category">Categories</label>
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
          {this.props.categories.map(category => (
            <CheckboxCategory
              category={category}
              key={category.id}
              handleCheckboxChange={this.toggleCheckbox}
              checked={false}
            />
          ))}

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
            onClick={this.handleAddAnother}
            disabled={!isEnabled}
            className={isEnabled ? 'enabled' : 'disabled'}
          >
            Save and add another
          </button>
          <button
            type="submit"
            onClick={this.handleSaveRedirect}
            disabled={!isEnabled}
            className={isEnabled ? 'enabled' : 'disabled'}
          >
            Save and go to jelly
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
