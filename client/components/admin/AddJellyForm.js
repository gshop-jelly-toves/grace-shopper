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
      priceCents: '',
      inventory: '',
      categoryIds: [],
      photo: '',
      checked: false
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
  }

  handleAddAnother = async event => {
    event.preventDefault()
    const newJelly = this.state
    await axios.post('/api/jellies', newJelly)

    this.setState({
      name: '',
      description: '',
      priceCents: '',
      inventory: '',
      categoryIds: [],
      photo: '',
    })
  }

  handleSaveRedirect = async event => {
    event.preventDefault()
    const newJelly = this.state
    if (newJelly.photo === "") {
      delete newJelly.photo
    }
    const {data} = await axios.post('/api/jellies', newJelly)

    this.props.history.push(`/jellies/${data.id}`)
  }

  render() {
    const {name, description, priceCents, inventory} = this.state
    const isEnabled = name && description && priceCents && inventory
    return (
      <div>
        <form id="add-jelly-form">
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
          <label htmlFor="priceCents">Price (cents):</label>
          <input
            type="number"
            name="priceCents"
            value={this.state.priceCents}
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




{/* Can't figure out how to reset checked to false after the handleAddAnother function call on the button submit */}

          {this.props.categories.map(category => (
            <CheckboxCategory
              category={category}
              key={category.id}
              handleCheckboxChange={this.toggleCheckbox}
              checked={this.state.checked}
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
