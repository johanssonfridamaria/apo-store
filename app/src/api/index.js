export const getProducts = () => {
  return fetch("https://apoteket-test.azurewebsites.net/api/products", {
    method: 'GET',
    credentials: 'include',
    headers: { "X-Key": "qwerty" }
  })
    .then(response => response.json())
    .then(data => {
      const validProducts = data.filter(a => a.Price != 0);
      return validProducts;
    });
}

export const getCart = () => {
  return fetch("https://apoteket-test.azurewebsites.net/api/cart", {
    method: 'GET',
    credentials: 'include',
    headers: { "X-Key": "qwerty" }
  })
    .then(response => response.json());
}

export const addToCart = (id, quantity) => {
  const requestOptions = {
    method: "POST",
    credentials: "include",
    headers: { "X-Key": "qwerty", "Content-Type": "application/json", },
    body: JSON.stringify({ id, quantity }),
  };

  return fetch("https://apoteket-test.azurewebsites.net/api/cart", requestOptions)
    .then(response => { return response.json(); });
}