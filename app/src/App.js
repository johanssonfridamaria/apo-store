import { useState, useEffect } from 'react';
import { getProducts, getCart, addToCart, deleteCart } from './api';
import Navbar from './components/navbar/Navbar';
import ProductCard from './components/productCard/ProductCard'
import './App.css';

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
        return;
      }
    }

    addToCart(id, quantity)
      .then(data => {
        getCart()
          .then(data => {
            const cartData = getManageCartData(data);
            setCart(cartData);
          })
      })
      .catch(err => { console.log('err', err); setAddToCartError({ hasError: true, productId: id, message: 'Varan lades inte till. Försök igen!' }); })
  }

  const handleDeleteCart = () => {
    deleteCart()
      .then(data => setCart(null));
  }

  const getManageCartData = (data) => {
    const itemsAndProductsCombined = data.Items.map(a => {
      const product = products.find(b => b.Id === a.Id);
      return {
        id: a.Id,
        price: product.Price,
        name: product.Name,
        pic: product.Pic,
        quantity: a.Quantity
      }
    });

    const getItemsTotal = () => {
      const total = itemsAndProductsCombined.reduce((prev, curr) => prev + (curr.price * curr.quantity), 0);
      return (Math.round(total * 100) / 100).toFixed(2);
    };

    console.log('itemsTotal', getItemsTotal())
    console.log('itemsAndProductsCombined', itemsAndProductsCombined)

    return {
      Items: itemsAndProductsCombined,
      ItemsTotal: getItemsTotal()
    };
  }

  return (
    <>
      <Navbar cart={cart} setShowCart={setShowCart} showCart={showCart} deleteCart={handleDeleteCart} />
      <div className='container'>
        {products.length &&
          <div className="card-wrapper">
            {products.map(product =>
              <ProductCard key={product.Id} product={product} addToCart={handleAddToCart} error={addToCartError} />
            )}
          </div>
        }
      </div>
    </>
  );
}

export default App;
