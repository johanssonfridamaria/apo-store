import { useState, useEffect } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import { getProducts, getCart, addToCart } from './api';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts()
      .then(data => setProducts(data));
  }, [])

  return products;
}

function App() {
  const [cart, setCart] = useState(null);
  const products = useProducts();

  const handleAddToCart = () => {
    addToCart(1, 2);
  }

  const handleGetCart = () => {
    getCart()
      .then(data => setCart(data));
  }

  return (
    <div>
      <nav className='navbar'>
        <div>Apo-shop</div>
        <div className='navbar-cart'>
          <button className='btn cart-btn' onClick={handleGetCart}>
            {/* <span>{cart.Total}</span> */}
            <span className='material-symbols-outlined navbar-icon' >
              shopping_bag
            </span>
          </button>
          {cart != null &&
            <div>
              {cart.items.map(item => <div key={item.Id}>
                <div>item.Id</div>
                <div>item.Quantity</div>
              </div>)}
              <div>cart.Total</div>
            </div>
          }
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
