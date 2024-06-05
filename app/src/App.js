import { useState, useEffect } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import { getProducts, getCart, addToCart, deleteCart } from './api';
import Cart from './components/Cart';
import Navbar from './components/Navbar';

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
  const [addToCartError, setAddToCartError] = useState(false);
  const products = useProducts();

  const handleAddToCart = (id, quantity, price) => {
    setAddToCartError(false);

    if (cart != null) {
      const exceedsLimit = (cart.Total += price) > 5000;

      if (exceedsLimit) {
        setAddToCartError({ hasError: true, productId: id, message: 'Din varukorg är full' })
      }
    }

    addToCart(id, quantity)
      .then(data => {
        console.log('data', data)
        getCart()
          .then(data => {
            if (data.Items.length === 0) {
              console.log('fel fick ej tillbaka items i cart')
              setAddToCartError({ hasError: true, productId: id })
            }

            const cartData = {
              Items: data.Items.map(a => {
                console.log('Products', products)
                const product = products.find(b => b.Id === a.Id);
                console.log('product', product)
                return {
                  id: a.Id,
                  price: product.Price,
                  name: product.Name,
                  pic: product.Pic,
                  quantity: a.Quantity
                }
              }),
              Total: data.Total
            }

            setCart(cartData);
          });
      })
      .catch(err => { console.log('err', err); setAddToCartError({ hasError: true, productId: id, message: 'Varan lades inte till. Försök igen!' }); })
  }

  const handleDeleteCart = () => {
    deleteCart()
      .then(data => setCart(null));
  }

  return (
    <div>
      <Navbar cart={cart} setShowCart={setShowCart} showCart={showCart} deleteCart={handleDeleteCart} />
      <div className='page-container'>
        {products.length &&
          <ProductList products={products} addToCart={handleAddToCart} error={addToCartError} />
        }
      </div>
    </div>
  );
}

export default App;
