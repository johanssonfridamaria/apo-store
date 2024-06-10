import { useEffect, useState } from "react";
import { getProducts } from "../api";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts()
      .then(data => setProducts(data));
  }, [])

  return products;
}

export const getConvertedCartData = (data, products) => {
  const itemsAndProductsCombined = data.Items.map(a => {
    const product = products.find(b => b.Id === a.Id);
    return {
      id: a.Id,
      price: product.Price,
      name: product.Name,
      pic: product.Pic,
      quantity: a.Quantity
    }
  });

  const getItemsTotal = () => {
    const total = itemsAndProductsCombined.reduce((prev, curr) => prev + (curr.price * curr.quantity), 0);
    return getNumberWithDecimal(total);
  };

  return {
    Items: itemsAndProductsCombined,
    ItemsTotal: getItemsTotal()
  };
}

export const getNumberWithDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
}