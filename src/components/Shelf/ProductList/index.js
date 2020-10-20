import React from 'react';

import Product from './Product';

const ProductList = ({ products }) => {
  return products.map(p => {
    return <Product product={p} key={p.code} />;
  });
};

export default ProductList;
