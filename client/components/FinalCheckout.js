import React from 'react'
import { connect } from 'react-redux'
import StripeForm from './StripeForm'
import { saveAddress, setAddressProp } from '../store'

class FinalCheckout extends React.Component {
  constructor(props) {
    super(props)
    this.isFilledOut = this.isFilledOut.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.props.setAddressProp({
      [e.target.name]: e.target.value
    })
  }

  isFilledOut() {
    if (this.state.firstName === '') return false
    if (this.state.lastName === '') return false
    if (this.state.street === '') return false
    if (this.state.state === '') return false
    if (this.state.city === '') return false
    if (this.state.zipcode === '') return false
    return true
  }  

  render() {
    return (
      <div>
        


        { this.isFilledOut 
          ? <StripeForm />
          : <div>Please fillout your address.</div>
        }
      </div>
    )
  }
}

const mapState = ({cart, user: {address}}) => ({
  cart, address
})

export default connect(mapState, {
  saveAddress
})(FinalCheckout)