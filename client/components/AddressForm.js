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
    const {address} = this.props
    return (
      <div className='center column' style={{width: 400}}>
        <h1 className='center'>Jelly Location</h1>
        <h4 className='center'>First name</h4>
        <input type='text' value={address.firstName} name='firstName' onChange={this.handleChange} />
        <h4 className='center'>Last name</h4>
        <input type='text' name='lastName' value={address.lastName} onChange={this.handleChange} />
        <h4 className='center'>State</h4>
        <input type='text' name='state' value={address.state} onChange={this.handleChange} />
        <h4 className='center'>City</h4>
        <input type='text' name='city' value={address.city} onChange={this.handleChange} />
        <h4 className='center'>Street</h4>
        <input type='text' name='street' value={address.street} onChange={this.handleChange} />
        <h4 className='center'>Zipcode</h4>
        <input type='text' name='zipcode' value={address.zipcode} onChange={this.handleChange} />


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