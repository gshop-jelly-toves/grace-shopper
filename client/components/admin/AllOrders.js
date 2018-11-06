import React, {Component} from 'react'
import axios from 'axios'
import {priceCentsToString} from '../../utils'

class AllOrders extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: [],
      orderView: ''
    }
    this.renderShipButton = this.renderShipButton.bind(this)
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

  handleProcess = async orderId => {
    const {data} = await axios.put(`/api/orders/${orderId}`, {
      newOrderType: 'processing'
    })
    const updatedOrder = data
    this.setState({
      orders: [...updatedOrder]
    })
  }

  handleShip = async orderId => {
    const {data} = await axios.put(`/api/orders/${orderId}`, {
      newOrderType: 'shipped'
    })
    const updatedOrder = data
    this.setState({
      orders: [...updatedOrder]
    })
  }

  handleCancel = async orderId => {
    const {data} = await axios.put(`/api/orders/${orderId}`, {
      newOrderType: 'cancelled'
    })
    const updatedOrder = data
    this.setState({
      orders: [...updatedOrder]
    })
  }
  renderShipButton() {
    return (
      <button type="button" value="markAsShipping" onClick={this.handleShip}>
        Mark as Shipped
      </button>
    )
  }

  render() {
    const orderFilter = orders =>
      this.state.orderView === ''
        ? orders
        : [...orders].filter(
            order =>
              order.status
                .toLowerCase()
                .indexOf(this.state.orderView.toLowerCase()) > -1
          )

    const cancelButton = (
      <button type="button" value="cancel" onClick={this.handleButton}>
        Cancel
      </button>
    )

    const markAsProcessing = (
      <button
        type="button"
        value="markAsProcessing"
        onClick={this.handleProcess}
      >
        Mark as Procssing
      </button>
    )

    console.log(this.state.orderView)

    return (
      <div>
        <h4>Order Type Filter</h4>
        <button type="button" value="" onClick={this.handleFilter}>
          All
        </button>
        <button type="button" value="created" onClick={this.handleFilter}>
          Created
        </button>
        <button type="button" value="processing" onClick={this.handleFilter}>
          Processing
        </button>
        <button type="button" value="shipped" onClick={this.handleFilter}>
          Shipped
        </button>
        <button type="button" value="delivered" onClick={this.handleFilter}>
          Delivered
        </button>
        <button type="button" value="cancelled" onClick={this.handleFilter}>
          Cancelled
        </button>

        {orderFilter(this.state.orders).map(order => (
          <div key={order.id}>
            <h4>Order ID: {order.id}</h4>
            <p>Order Status: {order.status}</p>
            <p>Ordered on {order.createdAt}</p>
            {order.status === 'cart' ? (
              <div>Cart Total: {priceCentsToString(order.cartTotal)}</div>
            ) : (
              <div>Order Total: {priceCentsToString(order.orderTotal)}</div>
            )}
            <br />
            {this.state.orderView === 'cancelled' ? (
              ''
            ) : (
              <button
                type="button"
                value="markAsCancelled"
                onClick={() => this.handleCancel(order.id)}
              >
                Cancel Order
              </button>
            )}

            {this.state.orderView === 'created' ? (
              <button
                type="button"
                value="markAsProcessing"
                onClick={() => this.handleProcess(order.id)}
              >
                Mark as Processing
              </button>
            ) : (
              ''
            )}

            {this.state.orderView === 'processing' ? (
              <button
                type="button"
                value="markAsShipped"
                onClick={() => this.handleShip(order.id)}
              >
                Mark as Shipped
              </button>
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
    )
  }
}

export default AllOrders
