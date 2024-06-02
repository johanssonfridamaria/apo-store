import ProductCard from "./ProductCard"

export default function ProductList({ products }) {
  return (
    <div className="list">
      {products.map(product =>
        <ProductCard key={product.Id} product={product} />
      )}
    </div>
  )
}