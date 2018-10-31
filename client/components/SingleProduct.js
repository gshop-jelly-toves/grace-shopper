import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store'
import NoMatch from './NoMatch'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.fetchSingleProduct(productId)
  }

  componentDidUpdate(prevProps) {
    const latest = this.props.match.params.productId
    const prev = prevProps.match.params.productId
    if (prev !== latest) {
      this.props.fetchSingleProduct(latest)
    }
  }

  render() {
    console.log(this.props)
    const { product } = this.props
    return this.props.product ? (
      <div>
        <div>
          <h2>{product.name}</h2>
          <img src={product.photo} />
          <h4>Inventory: {product.inventory}:</h4>
          <p>Rating: {product.rating} / 5</p>
          <p>Description: {product.description}</p>
        </div>
      </div>
    ) : (
      <NoMatch />
    )
  }
}

const mapState = state => {
  return {
    product: state.products.singleProduct
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleProduct: productId => dispatch(fetchSingleProduct(productId))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
