export const BASE = 'http://localhost:3000';
export const PRODUCTS_PATH = `${BASE}/products`;
export const CREATE_CART_PATH = `${BASE}/checkouts`;
export const SHOW_CART_PATH = `${BASE}/checkouts/:id`;
export const ADD_PRODUCT_PATH = `${BASE}/checkouts/:id/add`;
export const REMOVE_ITEM_PATH = `${BASE}/checkouts/:checkout_id/items/:id`;
