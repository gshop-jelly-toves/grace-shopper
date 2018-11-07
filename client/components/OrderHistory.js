import React, {Component} from 'react'
import axios from 'axios'
import {priceCentsToString} from '../utils'

class OrderHistory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: []
    }
  }

  async componentDidMount() {
    const res = await axios.get('/api/orders')
    const orders = res.data
    this.setState({
      orders: [...orders]
    })
  }

  render() {
    return this.state.orders.map(order => (
      <div key={order.id}>
        <h4>Order ID:{order.id}</h4>
        <p>Order Status: {order.status}</p>
        <p>Ordered on {order.createdAt}</p>
        {order.status === 'cart' ? (
          <div>Cart Total: {priceCentsToString(order.cartTotal)}</div>
        ) : (
          <div>Order Total: {priceCentsToString(order.orderTotal)}</div>
        )}
      </div>
    ))
  }
}

export default OrderHistory
