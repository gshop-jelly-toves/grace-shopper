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
      <button
        type="button"
        className="btn btn-warning"
        value="markAsShipping"
        onClick={this.handleShip}
      >
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
      <button
        type="button"
        className="btn btn-danger"
        value="cancel"
        onClick={this.handleButton}
      >
        Cancel Order
      </button>
    )

    console.log(this.state.orderView)

    return (
      <div className="container">
        <div className="row p-3 align-items-center">
          {/*
            ADMIN TOOLS
            ALL ORDERS
            BUTTON FILTERS
        */}
          <div className="col">
            <h2>View All Orders</h2>
          </div>
        </div>
        <div className="row p-3">
          <div className="col">
            <button
              type="button"
              className="btn btn-block btn-secondary"
              value=""
              onClick={this.handleFilter}
            >
              All
            </button>
          </div>
          <div className="col">
            <button
              type="button"
              className="btn btn-block btn-primary"
              value="created"
              onClick={this.handleFilter}
            >
              Created
            </button>
          </div>
          <div className="col">
            <button
              type="button"
              className="btn btn-block btn-info"
              value="processing"
              onClick={this.handleFilter}
            >
              Processing
            </button>
          </div>
          <div className="col">
            <button
              type="button"
              className="btn btn-block btn-warning"
              value="shipped"
              onClick={this.handleFilter}
            >
              Shipped
            </button>
          </div>
          <div className="col">
            <button
              type="button"
              className="btn btn-block btn-success"
              value="delivered"
              onClick={this.handleFilter}
            >
              Delivered
            </button>
          </div>
          <div className="col">
            <button
              type="button"
              className="btn btn-block btn-danger"
              value="cancelled"
              onClick={this.handleFilter}
            >
              Cancelled
            </button>
          </div>
        </div>
        {/*
            ALL ORDERS
        */}
        {orderFilter(this.state.orders).map(order => (
          <div className="row p-3 align-items-center border-top" key={order.id}>
            <div className="col-9 col-md-9">
              <h4>Order #{order.id}</h4>
              <p>Order Status: {order.status}</p>

              <p>Ordered on {new Date(order.createdAt).toUTCString()}</p>
              {order.status === 'cart' ? (
                <div>Cart Total: {priceCentsToString(order.cartTotal)}</div>
              ) : (
                <div>Order Total: {priceCentsToString(order.orderTotal)}</div>
              )}
            </div>
            <div className="col-3 col-md-3">
              {this.state.orderView === 'created' ? (
                <div>
                  <button
                    type="button"
                    className="btn btn-block btn-info"
                    value="markAsProcessing"
                    onClick={() => this.handleProcess(order.id)}
                  >
                    Mark as Processing
                  </button>
                  <br />
                  <br />
                </div>
              ) : (
                ''
              )}

              {this.state.orderView === 'processing' ? (
                <div>
                  <button
                    type="button"
                    className="btn btn-block btn-warning"
                    value="markAsShipped"
                    onClick={() => this.handleShip(order.id)}
                  >
                    Mark as Shipped
                  </button>
                  <br />
                  <br />
                </div>
              ) : (
                ''
              )}
              {this.state.orderView === 'cancelled' ||
              this.state.orderView === 'delivered' ? (
                ''
              ) : (
                <button
                  type="button"
                  className="btn btn-block btn-danger"
                  value="markAsCancelled"
                  onClick={() => this.handleCancel(order.id)}
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default AllOrders
