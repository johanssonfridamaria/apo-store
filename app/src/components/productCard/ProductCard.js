import { useState } from "react";
import './ProductCard.css'
import { getNumberWithDecimal } from "../../utils";

export default function ProductCard({ product, addToCart, setAddToCartError, error, cartTotal }) {
  const [picNotFound, setPicNotFound] = useState(false);
  const quantity = 1;

  const onError = () => {
    setPicNotFound(true);
  }

  const handleClick = () => {
    let exceedsLimit = false;
    let cartTotalInt = parseInt(cartTotal)
    if (cartTotal != null) {
      const sum = cartTotalInt += (product.Price * quantity)
      exceedsLimit = sum > 5000;
      if (exceedsLimit) {
        setAddToCartError({ productId: product.Id, message: 'Din varukorg är full' });
      }
    }

    if (!exceedsLimit) {
      addToCart(product.Id, quantity);
    }
  }

  return (
    <div className="card">
      <div className="product">
        <div>
          <div className="product-image">
            {!picNotFound
              ? <img src={product.Pic} alt={product.name} onError={onError} />
              : <span className="material-symbols-outlined">
                no_photography
              </span>}
          </div>
          <h3>{product.Name}</h3>
          <p>{product.Description}</p>
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
            <span> {getNumberWithDecimal(product.Price)} kr</span>
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