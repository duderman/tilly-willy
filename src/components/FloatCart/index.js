import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { loadCart, removeItem, openFloatCart, closeFloatCart } from '../../services/cart/actions';
import CartProduct from './CartProduct';
import { formatPrice } from '../../services/util';
import Spinner from '../Spinner';

import './style.scss';

class FloatCart extends Component {
  static propTypes = {
    loadCart: PropTypes.func.isRequired,
    cart_id: PropTypes.string,
    newProduct: PropTypes.object,
    removeItem: PropTypes.func,
    openFloatCart: PropTypes.func.isRequired,
    closeFloatCart: PropTypes.func.isRequired,
    isFetchingProducts: PropTypes.bool.isRequired,
  };

  state = {
    isLoading: false
  };

  componentDidMount() {
    this.handleLoadCart();
  }

  handleLoadCart = () => {
    const { cart_id } = this.props;
    this.setState({ isLoading: true });
    this.props.loadCart(cart_id, () => {
      this.setState({ isLoading: false });
    });
  };

  render() {
    const { items, isFetchingProducts, isOpen, openFloatCart, closeFloatCart } = this.props;
    const { isLoading } = this.state;

    let cartProducts = [];

    if (!isFetchingProducts) {
      cartProducts = items.map(item => {
        return (
          <CartProduct
            item={item}
            key={item.id}
          />
        );
      });
    }

    const reducer = (total, item) => total + item.price
    const subtotal = items.reduce(reducer, 0)

    let classes = ['float-cart'];

    if (!!isOpen) {
      classes.push('float-cart--open');
    }

    return (
      <React.Fragment>
        {isLoading && <Spinner />}
        <div className={classes.join(' ')}>
          {/* If cart open, show close (x) button */}
          {isOpen && (
            <div
              onClick={() => closeFloatCart()}
              className="float-cart__close-btn"
            >
              X
            </div>
          )}

          {/* If cart is closed, show bag with quantity of product and open cart action */}
          {!isOpen && (
            <span
              onClick={() => openFloatCart()}
              className="bag bag--float-cart-closed"
            >
              <span className="bag__quantity">{cartProducts.length}</span>
            </span>
          )}

          <div className="float-cart__content">
            <div className="float-cart__header">
              <span className="bag">
                <span className="bag__quantity">{cartProducts.length}</span>
              </span>
              <span className="header-title">Cart</span>
            </div>

            <div className="float-cart__shelf-container">
              {cartProducts}
              {!cartProducts.length && (
                <p className="shelf-empty">
                  Add something to the cart <br />
                  :)
                </p>
              )}
            </div>

            <div className="float-cart__footer">
              <div className="sub">SUBTOTAL</div>
              <div className="sub-price">
                <p className="sub-price__val">
                  ￡
                  {formatPrice(subtotal)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  cart_id: state.cart.cart.id,
  items: state.cart.cart.items,
  discounts: state.cart.cart.discounts,
  newProduct: state.cart.productToAdd,
  isOpen: state.cart.floatCartOpened,
  isFetchingProducts: state.shelf.isFetching,
});

export default connect(
  mapStateToProps,
  { loadCart, removeItem, openFloatCart, closeFloatCart }
)(FloatCart);
