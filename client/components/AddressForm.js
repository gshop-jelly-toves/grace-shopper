import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {FinalCheckout} from './index'
import {setAddressProp, saveAddress, fetchAddress} from '../store'

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
    console.log(address)
    return (
      <Fragment>
        <div className="row px-5">
          <div className="col">
            <h2>Please enter your shipping details.</h2>
          </div>
        </div>
        <form>
          <div className="row px-5">
            <div className="form-group col">
              <label htmlFor="address-firstName">First Name</label>
              <input
                onChange={this.handleChange}
                type="text"
                value={address.firstName}
                placeholder={address.firstName}
                name="firstName"
                className="form-control"
                id="address-firstName"
                aria-describedby="address-firstName"
              />
              {/* <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small> */}
            </div>
          </div>
          <div className="row px-5">
            <div className="form-group col">
              <label htmlFor="address-lastName">Last Name</label>
              <input
                onChange={this.handleChange}
                type="text"
                value={address.lastName}
                placeholder={address.lastName}
                name="lastName"
                className="form-control"
                aria-describedby="address-lastName"
                id="address-lastName"
              />
            </div>
          </div>
          <div className="row px-5">
            <div className="form-group col-5">
              <label htmlFor="address-street">Street Address</label>
              <input
                onChange={this.handleChange}
                type="text"
                value={address.street}
                placeholder={address.street}
                name="address"
                className="form-control"
                aria-describedby="address-street"
                id="address-street"
              />
            </div>
            <div className="form-group col-3">
              <label htmlFor="address-city">City</label>
              <input
                onChange={this.handleChange}
                type="text"
                value={address.city}
                placeholder={address.city}
                name="city"
                className="form-control"
                aria-describedby="address-city"
                id="address-city"
              />
            </div>
            <div className="form-group col">
              <label htmlFor="address-state">State</label>
              <input
                onChange={this.handleChange}
                type="text"
                value={address.state}
                placeholder={address.state}
                name="state"
                className="form-control"
                aria-describedby="address-state"
                id="address-state"
              />
            </div>
            <div className="form-group col">
              <label htmlFor="address-zipcode">Zip Code</label>
              <input
                onChange={this.handleChange}
                type="text"
                value={address.zipcode}
                placeholder={address.zipcode}
                name="zipcode"
                className="form-control"
                aria-describedby="address-zipcode"
                id="address-zipcode"
              />
            </div>
          </div>
          {this.isFilledOut() ? (
            <div className="row px-5 justify-content-end">
              <div className="col-4">
                <button
                  type="button"
                  className="btn btn-block btn-lg btn-success"
                  onClick={this.handleProceed}
                >
                  Save & Proceed to checkout
                </button>
              </div>
            </div>
          ) : (
            <div>Please fillout your address.</div>
          )}
        </form>
      </Fragment>
    )
  }
}

const mapState = ({cart, user: {address}}) => ({
  cart,
  address
})

export default withRouter(
  connect(mapState, {
    setAddressProp,
    saveAddress,
    fetchAddress
  })(AddressForm)
)
