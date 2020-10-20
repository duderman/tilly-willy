import axios from 'axios';

import { LOAD_CART, ADD_PRODUCT, REMOVE_ITEM, OPEN_FLOAT_CART, CLOSE_FLOAT_CART } from './actionTypes';
import {
  SHOW_CART_PATH,
  CREATE_CART_PATH,
  ADD_PRODUCT_PATH,
  REMOVE_ITEM_PATH
} from '../paths';

export const loadCart = (cart_id, callback) => dispatch => {
  return buildCartRequest(cart_id)
    .then(res => {
      let cart = res.data;

      if (!!callback) {
        callback();
      }

      return dispatch({
        type: LOAD_CART,
        payload: cart
      });
    })
    .catch(err => {
      console.log('Could not load cart. Try again later.');
    });
};

const buildCartRequest = id => {
  if (id) {
    return axios.get(SHOW_CART_PATH.replace(':id', id));
  } else {
    return axios.post(CREATE_CART_PATH);
  }
};

export const addProduct = (cart_id, product_id, callback) => dispatch => {
  return axios
    .post(ADD_PRODUCT_PATH.replace(':id', cart_id), { product_id: product_id })
    .then(res => {
      let cart = res.data;

      if (!!callback) {
        callback();
      }

      return dispatch({ type: ADD_PRODUCT, payload: cart });
    })
    .catch(err => {
      console.log('Could not add product. Try again later.');
    });
};

export const removeItem = (cart_id, item_id, callback) => dispatch => {
  return axios
    .delete(

      REMOVE_ITEM_PATH.replace(':checkout_id', cart_id).replace(':id', item_id)

    )
    .then(res => {
      let cart = res.data;

      if (!!callback) {
        callback();
      }

      return dispatch({ type: REMOVE_ITEM, payload: cart });
    })
    .catch(err => {
      console.log('Could not add product. Try again later.');
    });
};

export const openFloatCart = () => ({
  type: OPEN_FLOAT_CART
});

export const closeFloatCart = () => ({
  type: CLOSE_FLOAT_CART
});
