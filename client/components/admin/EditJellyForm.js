import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCategories} from '../../store/jellies'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

class EditJellyForm extends Component {
  constructor(props) {
    super(props)
    this.state = props.jelly[this.props.match.params.jellyId]
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
    await axios.put(`/api/jellies/${newJelly.id}`, newJelly)
    this.props.done()
  }

  render() {
    const {name, description, priceCents, inventory} = this.state
    const isEnabled = name && description && priceCents && inventory
    const {jelly} = this.props

    return (
      <div>
        <form>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />
          <img src={jelly.photo} />
          <label htmlFor="photo">Jelly Photo</label>
          <input
            type="url"
            name="photo"
            placeholder="http://example.com"
            value={this.state.photo}
            onChange={this.handleChange}
            required
          />
          <label htmlFor="priceCents">Price (cents): </label>
          <input
            type="number"
            name="priceCents"
            value={this.state.priceCents}
            onChange={this.handleChange}
            required
          />
          <p>Rating: {jelly.rating}/5</p>
          <label htmlFor="inventory">Inventory</label>
          <input
            type="number"
            name="inventory"
            value={this.state.inventory}
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
          <button
            type="submit"
            onClick={this.handleSubmit}
            disabled={!isEnabled}
            className={isEnabled ? 'enabled' : 'disabled'}
          >
            Update Jelly
          </button>
        </form>
      </div>
    )
  }
}

const mapState = ({jellies: {categories}, jellies: {jellies}}) => ({
  categories,
  jelly: jellies
})

const mapDispatch = {
  fetchCategories
}

export default withRouter(connect(mapState, mapDispatch)(EditJellyForm))
