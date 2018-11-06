import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { FinalCheckout } from './index'
import { setAddressProp, saveAddress, fetchAddress } from '../store'

class AddressForm extends React.Component {
  constructor(props) {
    super(props)
    this.isFilledOut = this.isFilledOut.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleProceed = this.handleProceed.bind(this)
  }

  componentDidMount() {
    this.props.fetchAddress()
  }

  handleProceed() {
    this.props.saveAddress(this.props.address)
    this.props.history.push('/cart/order')
  }

  handleChange(e) {
    this.props.setAddressProp({
      [e.target.name]: e.target.value
    })
  }

  isFilledOut() {
    const {address} = this.props
    if (address.firstName === '') return false
    if (address.lastName === '') return false
    if (address.street === '') return false
    if (address.state === '') return false
    if (address.city === '') return false
    if (address.zipcode === '') return false
    return true
  }  

  render() {
    return (
      <div>
        FIRST
        <input type='text' name='firstName' onChange={this.handleChange} />
        LAST
        <input type='text' name='lastName' onChange={this.handleChange} />
        STATE
        <input type='text' name='state' onChange={this.handleChange} />
        CITY
        <input type='text' name='city' onChange={this.handleChange} />
        STREET
        <input type='text' name='street' onChange={this.handleChange} />
        ZIPCODE
        <input type='text' name='zipcode' onChange={this.handleChange} />


        { this.isFilledOut()
          ? <button onClick={this.handleProceed}>
            Save & Proceed to checkout
          </button>
          : <div>Please fillout your address.</div>
        }
      </div>
    )
  }
}

const mapState = ({cart, user: {address}}) => ({
  cart, address
})

export default withRouter(connect(mapState, {
 setAddressProp, saveAddress, fetchAddress
})(AddressForm))