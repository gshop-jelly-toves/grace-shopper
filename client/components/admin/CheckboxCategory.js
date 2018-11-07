import React, {Component} from 'react'

class CheckboxCategory extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isChecked: this.props.checked
    }
  }


  toggleCheckboxChange = () => {
    const {handleCheckboxChange, category} = this.props

    this.setState(({isChecked}) => ({
      isChecked: !isChecked
    }))

    handleCheckboxChange(category)
  }

  render() {
    const {isChecked} = this.state

    return (
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            // value={this.props.category.id}
            checked={isChecked}
            onChange={this.toggleCheckboxChange}
          />
          {this.props.category.name}
        </label>
      </div>
    )
  }
}

export default CheckboxCategory
