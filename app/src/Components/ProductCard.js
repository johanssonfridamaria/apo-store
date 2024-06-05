import { useState } from "react";
import './ProductCard.css'

export default function ProductCard({ product, addToCart, error }) {
  const [picNotFound, setPicNotFound] = useState(false);
  const [quantity, setQuantity] = useState(1)

  const onError = () => {
    setPicNotFound(true);
  }

  const handleClick = () => {
    addToCart(product.Id, quantity, product.Price);
  }

  return (
    <div className="card">
      <div className="product">
        <div>
          <div className="product-image">
            {!picNotFound
              ? <img src={product.Pic} onError={onError} />
              : <span className="material-symbols-outlined">
                no_photography
              </span>}
          </div>
          <div>
            <h3>{product.Name}</h3>
            <p>{product.Description}</p>
          </div>
        </div>
        <div className="product-lower">
          {error && error.productId === product.Id &&
            <div className="error-message">
              <span className="material-symbols-outlined">
                error
              </span>
              <p>{error.message}</p>
            </div>
          }
          <div className="product-price">
            <span> {product.Price} kr</span>
            <button disabled={!product.Buyable}
              className={`btn product-btn ${!product.Buyable ? "disabled" : ""}`} onClick={handleClick}>
              {!product.Buyable ? 'Slut i lager' : 'Köp'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}