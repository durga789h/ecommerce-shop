// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/product/get-product');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      {products.map(product => (
        <div key={product._id}>
          <p>Name: {product.name}</p>
          <p>Price: {product.price}</p>
          <input type="number" defaultValue="1" min="1" />
          <button>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
