export default function ProductCard({ product }) {
  return (
    <div>
      <img src={product.Pic} />
      <div>{product.Name}</div>
      <div>{product.Description}</div>
      <div>{product.Price}</div>
      <div>{product.Buyable}</div>
    </div>
  )
}