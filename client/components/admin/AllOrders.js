import React, {Component} from 'react'
import axios from 'axios'
// import {priceCentsToString} from '../utils'

class AllOrders extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: [],
      orderView: ''
    }
  }

  async componentDidMount() {
    const res = await axios.get('/api/orders/all')
    const allOrders = res.data
    this.setState({
      orders: [...allOrders]
    })
  }

  handleFilter = event => {
    this.setState({
      orderView: event.target.value
    })
  }

  render() {
    console.log('ALL ORDERS STATE', this.state)
    return (
      <div>
        <h4>Order Type Filter</h4>
        <button type="button" value="pending" onClick={this.handleFilter}>
          Pending
        </button>
        <button type="button" value="pending" onClick={this.handleFilter}>
          Pending
        </button>
        <button type="button" value="pending" onClick={this.handleFilter}>
          Pending
        </button>

      </div>
    )
  }
}

export default AllOrders
