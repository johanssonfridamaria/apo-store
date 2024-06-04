import { useState } from "react";
import './ProductCard.css'

export default function ProductCard({ product, addToCart }) {
  const [picNotFound, setPicNotFound] = useState(false);
  const [quantity, setQuantity] = useState(1)

  const onError = () => {
    // console.log('onError')
    // setPicNotFound(true);
  }

  const handleClick = () => {
    console.log("click")
    addToCart(product.Id, quantity);
  }

  return (
    <div className="card">
      <div className="product">
        <div className="product-image">
          {!picNotFound
            ? <img src={product.Pic} onError={onError()} />
            : <span className="material-symbols-outlined">
              no_photography
            </span>}
        </div>
        <div className="product-info">
          <h3>{product.Name}</h3>
          <p>{product.Description}</p>
          <span className="product-price"> {product.Price} kr</span>
          <div className="product-utils">
            <button disabled={!product.Buyable} className="btn product-btn" onClick={handleClick}>Lägg i varukorg</button>
          </div>
        </div>
      </div>
    </div>
  )
}