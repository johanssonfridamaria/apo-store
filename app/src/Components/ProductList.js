import ProductCard from "./ProductCard";

export default function ProductList({ products, addToCart }) {
  return (
    <div className="list">
      {products.map(product =>
        <ProductCard key={product.Id} product={product} addToCart={addToCart} />
      )}
    </div>
  )
}