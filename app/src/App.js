import { useState, useEffect } from 'react';
import './App.css';
import ProductList from './components/ProductList';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    let ignore = false;

    const requestOptions = {
      method: 'GET',
      headers: { 'X-Key': 'qwerty' }
    }

    fetch('https://apoteket-test.azurewebsites.net/api/products', requestOptions)
      .then(response => response.json())
      .then(json => {
        if (!ignore) {
          console.log('json', json)
          setProducts(json)
        }
      })

    return () => {
      ignore = true
    }
  }, [])

  return (
    <div>
      <nav className='navbar'>
        <div>Apo-shop</div>
        <div className='navbar-cart'>
          <button className='btn cart-btn'>
            <span className="material-symbols-outlined navbar-icon" >
              shopping_bag
            </span>
          </button>
          {/* <div>
            varukorg
          </div> */}
        </div>
      </nav>
      {products.length &&
        <ProductList products={products} />
      }
    </div>
  );
}

export default App;
