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
  // const [isSaving, setIsSaving] = useState(false);
  const [addToCartError, setAddToCartError] = useState(false);
  const products = useProducts();
  // const productConfigs = products.map(a => {
  //   id = a.Id,
  //     error = false,
  //   name =   
  // })

  const handleAddToCart = (id, quantity, price) => {

    if (cart != null) {
      const exceedsLimit = (cart.Total += price) > 5000;

      if (exceedsLimit) {
        //Do something
      }
    }

    addToCart(id, quantity)
      .then(data => {
        getCart()
          .then(data => {
            if (data.Items.length === 0) {
              console.log('fel fick ej tillbaka items i cart')
              setAddToCartError(true)
            }
            console.log('data getcart', data);
            setCart(data);
          });
      })
      .catch(err => { console.log('err', err); setAddToCartError({ hasError: true, productId: id }); })
  }

  const handleGetCart = () => {
    setShowCart(!showCart);
  }

  const handleDeleteCart = () => {
    deleteCart()
      .then(data => setCart(null));
  }

  return (
    <div>
      <nav className='navbar'>
        <div>Apo-shop</div>
        <div className='navbar-cart'>
          <button className='btn cart-btn' onClick={handleGetCart}>
            <span>{cart?.Total != null ? cart.Total : '0.00'}</span>
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
          <ProductList products={products} addToCart={handleAddToCart} error={addToCartError} />
        }
      </div>
    </div>
  );
}

export default App;
