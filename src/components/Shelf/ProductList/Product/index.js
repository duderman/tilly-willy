import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Thumb from '../../../Thumb';

import { formatPrice } from '../../../../services/util';
import { addProduct, openFloatCart } from '../../../../services/cart/actions';

const Product = ({ product, addProduct, cart_id }) => {
  const formattedPrice = formatPrice(product.price, product.currency);

  const handleAddProduct = () => {
    addProduct(cart_id, product.id, () => {
      openFloatCart()
    });
  }

  return (
    <div
      className="shelf-item"
      onClick={handleAddProduct}
      data-code={product.code}
    >
      <Thumb
        classes="shelf-item__thumb"
        src={require(`../../../../static/products/${product.code}_1.jpg`)}
        alt={product.title}
      />
      <p className="shelf-item__title">{product.name}</p>
      <div className="shelf-item__price">
        <div className="val">
          <small>￡</small>
          <b>{formattedPrice.substr(0, formattedPrice.length - 3)}</b>
          <span>{formattedPrice.substr(formattedPrice.length - 3, 3)}</span>
        </div>
      </div>
      <div className="shelf-item__buy-btn">Add to cart</div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
  addProduct: PropTypes.func.isRequired,
  cart_id: PropTypes.string.isRequired,
  openFloatCart: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  cart_id: state.cart.cart.id
});

export default connect(
  mapStateToProps,
  { addProduct, openFloatCart }
)(Product);
