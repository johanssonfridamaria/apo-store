import { useState, useEffect } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import { getProducts, getCart, addToCart } from './api';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts()
      .then(response => setProducts(response));
  }, [])

  return products;
}

const useCart = () => {
  const [cart, setCart] = useState(null);
  useEffect(() => {
    getCart()
      .then(response => setCart(response));
  }, [])

  return cart;
}

function App() {
  const products = useProducts();

  const handleAddToCart = () => {
    addToCart(1, 2);
  }

  return (
    <div>
      <nav className='navbar'>
        <div>Apo-shop</div>
        <div className='navbar-cart'>
          <button className='btn cart-btn' onClick={getCart}>
            {/* <span>{cart.Total}</span> */}
            <span className='material-symbols-outlined navbar-icon' >
              shopping_bag
            </span>
          </button>
          {/* <div>
            varukorg
          </div> */}
        </div>
      </nav>
      <div className='page-container'>
        {products.length &&
          <ProductList products={products} addToCart={handleAddToCart} />
        }
      </div>
    </div>
  );
}

export default App;
