import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleProduct } from '../../store'
import NoMatch from './NoMatch';

class SingleProduct extends Component {
  componentDidMount() {
    const productId = this.props.match.params.productId;
    this.props.fetchSingleProduct(productId);
  }

  componentDidUpdate(prevProps) {
    const latest = this.props.match.params.productId
    const prev = prevProps.match.params.productId
    if (prev !== latest) {
      this.props.fetchSingleProduct(latest)
    }
  }

  render() {
    const { product } = this.props;
    return this.props.product ? (
      <div>
        <div>
          <h2>{product.name}</h2>
          <img src={product.photo} />
          <p>Address: {product.address}</p>
          <p>Description: {product.text}</p>
          <h4>Students:</h4>
          <div className="single-product-students">
            {!product.students
              ? "Sorry this product doesn't have any students"
              : product.students.map(student => (
                  <Link to={`/students/${student.id}`} key={student.id}>
                    <img src={student.imageUrl} />
                    <p>
                      {student.firstName} {student.lastName}
                    </p>
                  </Link>
                ))}
          </div>
        </div>
      </div>
    ) : (
      <NoMatch />
    );
  }
}

const mapState = state => {
  return {
    product: state.products.singleProduct
  };
};

const mapDispatch = dispatch => {
  return {
    fetchSingleProduct: productId => dispatch(fetchSingleProduct(productId))
  };
};

export default connect(
  mapState,
  mapDispatch
)(SingleProduct);
