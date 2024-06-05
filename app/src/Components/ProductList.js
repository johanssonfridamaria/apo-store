import ProductCard from "./ProductCard";

export default function ProductList({ products, addToCart, error }) {
  return (
    <div className="card-wrapper">
      {products.map(product =>
        <ProductCard key={product.Id} product={product} addToCart={addToCart} error={error} />
      )}
    </div>
  )
}