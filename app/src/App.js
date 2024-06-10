import { useState } from 'react';
import { getCart, addToCart, deleteCart } from './api';
import { getConvertedCartData, useProducts } from './utils';
import Navbar from './components/navbar/Navbar';
import ProductCard from './components/productCard/ProductCard'
import './App.css';

function App() {
  const [cart, setCart] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [addToCartError, setAddToCartError] = useState(false);
  const products = useProducts();

  const handleAddToCart = (id, quantity) => {
    setAddToCartError(false);

    addToCart(id, quantity)
      .then(data => {
        getCart()
          .then(data => {
            const cartData = getConvertedCartData(data, products);
            setCart(cartData);
          })
      })
      .catch(err => { console.log('err', err); setAddToCartError({ productId: id, message: 'Varan lades inte till. Försök igen!' }); })
  }

  const handleDeleteCart = () => {
    deleteCart()
      .then(data => setCart(null));
  }

  return (
    <>
      <Navbar cart={cart} setShowCart={setShowCart} showCart={showCart} deleteCart={handleDeleteCart} />
      <div className='container'>
        {products.length &&
          <div className="card-wrapper">
            {products.map(product =>
              <ProductCard key={product.Id} product={product} addToCart={handleAddToCart} setAddToCartError={setAddToCartError} error={addToCartError} cartTotal={cart?.ItemsTotal} />
            )}
          </div>
        }
      </div>
    </>
  );
}

export default App;
