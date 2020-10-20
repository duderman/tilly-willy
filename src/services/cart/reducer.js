import {
  LOAD_CART,
  ADD_PRODUCT,
  REMOVE_ITEM,
  OPEN_FLOAT_CART,
  CLOSE_FLOAT_CART
} from './actionTypes';

const initialState = {
  cart: {
    items: [],
    discounts: []
  },
  floatCartOpened: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_CART:
      return { ...state, cart: action.payload };
    case ADD_PRODUCT:
      return { ...state, cart: action.payload };
    case REMOVE_ITEM:
      return { ...state, cart: action.payload};
    case OPEN_FLOAT_CART:
      return { ...state, floatCartOpened: true };
    case CLOSE_FLOAT_CART:
      return { ...state, floatCartOpened: false };
    default:
      return state;
  }
}
