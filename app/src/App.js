import { useState, useEffect } from 'react';
import './App.css';
import ProductList from './Components/ProductList';

function App() {
  const [products, setProducts] = useState([]);

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
    <div className="App">
      {products.length &&
        <ProductList products={products} />
      }
    </div>
  );
}

export default App;
