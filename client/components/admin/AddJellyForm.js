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

  toggleCheckbox = checkbox => {
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

    // console.log('ENTIRE SET', this.selectedCheckboxes)
    // this.selectedCheckboxes.forEach(e => e.delete(e))
    // console.log(this.selectedCheckboxes)

    // (function() {
    // document.getElementById("add-jelly-form").reset();
    // })()

    this.setState({
      name: '',
      description: '',
      priceCents: '',
      inventory: '',
      categoryIds: [],
      photo: ''
    })
  }

  handleSaveRedirect = async event => {
    event.preventDefault()
    const newJelly = this.state
    if (newJelly.photo === '') {
      delete newJelly.photo
    }
    const {data} = await axios.post('/api/jellies', newJelly)

    this.props.history.push(`/jellies/${data.id}`)
  }

  render() {
    const {name, description, priceCents, inventory} = this.state
    const isEnabled = name && description && priceCents && inventory
    // console.log('RENDER', this.state)

    return (
      <div className="container">
        <div className="row p-3">
          <form id="add-jelly-form">
            <h2>Add Jelly</h2>

            <div className="form-row">
              <div className="col">
                <label htmlFor="name">Jelly Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Jelly Name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="col">
                <label htmlFor="photo">Jelly Photo</label>
                <input
                  type="url"
                  name="photo"
                  className="form-control"
                  placeholder="Place link to jelly image here"
                  value={this.state.photo}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="col">
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  placeholder="Jelly description"
                  rows="4"
                  value={this.state.description}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="col">
                <label htmlFor="priceCents">Price (cents)</label>
                <input
                  type="number"
                  name="priceCents"
                  className="form-control"
                  placeholder="Enter price in cents"
                  value={this.state.priceCents}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="col">
                <label htmlFor="inventory">Inventory</label>
                <input
                  type="number"
                  name="inventory"
                  className="form-control"
                  placeholder="How many are in stock?"
                  value={this.state.inventory}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>

            {/* Can't figure out how to reset checked to false after the handleAddAnother function call on the button submit */}
            <div className="form-row">
              <div className="col">
                <label htmlFor="category">Categories</label>
                {this.props.categories.map(category => (
                  <CheckboxCategory
                    category={category}
                    key={category.id}
                    handleCheckboxChange={this.toggleCheckbox}
                    checked={this.state.checked}
                  />
                ))}
              </div>
            </div>
          </form>
          <div className="col">
            <button
              type="submit"
              onClick={this.handleAddAnother}
              disabled={!isEnabled}
              className={isEnabled ? 'enabled' : 'disabled'}
            >
              Save and add another
            </button>
          </div>
          <div className="col">
            <button
              type="submit"
              onClick={this.handleSaveRedirect}
              disabled={!isEnabled}
              className={isEnabled ? 'enabled' : 'disabled'}
            >
              Save and go to jelly
            </button>
          </div>
        </div>
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
