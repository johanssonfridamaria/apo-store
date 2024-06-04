import { useState, useEffect } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import { getProducts, getCart, addToCart, deleteCart } from './api';
import Cart from './components/Cart';

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
  const [showCart, setShowCart] = useState(false);
  const products = useProducts();

  const handleAddToCart = (id, quantity) => {
    addToCart(id, quantity)
      .catch(err => console.log('err', err))
  }

  const handleGetCart = () => {
    getCart()
      .then(data => setCart(data));
    setShowCart(!showCart);
  }

  const handleDeleteCart = () => {
    deleteCart()
      .then(data => setCart(null));
  }
  console.log('cart', cart)

  return (
    <div>
      <nav className='navbar'>
        <div>Apo-shop</div>
        <div className='navbar-cart'>
          <button className='btn cart-btn' onClick={handleGetCart}>
            <span>{cart.Total != null ? cart.Total : '0.00'}</span>
            <span className='material-symbols-outlined navbar-icon' >
              shopping_bag
            </span>
          </button>
          <div className={`shopping-cart ${showCart ? 'open' : ''}`}>
            <Cart cart={cart} deleteCart={handleDeleteCart} setShowCart={setShowCart} />
          </div>
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
