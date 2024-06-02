export default function ProductCard({ product }) {
  return (
    <div className="card">
      <div className="product">
        <div className="product-image">
          <img src={product.Pic} />
        </div>
        <div className="product-info">
          <h3>{product.Name}</h3>
          <p>{product.Description}</p>
          <span className="product-price"> {product.Price} kr</span>
          <div className="product-utils">
            <button disabled={!product.Buyable} className="product-btn">Lägg i varukorg</button>
          </div>
        </div>
      </div>
    </div>
  )
}