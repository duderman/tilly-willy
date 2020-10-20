import { FETCH_PRODUCTS, FETCHING_PRODUCTS } from './actionTypes';

const initialState = {
  products: [],
  isFetching: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCHING_PRODUCTS:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        isFetching: false
      };
    default:
      return state;
  }
}
