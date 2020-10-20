import { combineReducers } from 'redux';
import shelfReducer from './shelf/reducer';
import cartReducer from './cart/reducer';
import sortReducer from './sort/reducer';

export default combineReducers({
  shelf: shelfReducer,
  cart: cartReducer,
  sort: sortReducer,
});
