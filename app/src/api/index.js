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
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error('Something went wrong when fetching cart');
    });
}

export const addToCart = (id, quantity) => {
  const requestOptions = {
    method: "POST",
    credentials: "include",
    headers: { "X-Key": "qwerty", "Content-Type": "application/json", },
    body: JSON.stringify({ id, quantity }),
  };

  return fetch("https://apoteket-test.azurewebsites.net/api/cart", requestOptions)
    .then(response => {
      if (response.status === 200 || response.status === 201) {
        return response;
      }
      throw new Error('Something went wrong when adding to cart');
    })
}

export const deleteCart = () => {
  const requestOptions = {
    method: "DELETE",
    credentials: "include",
    headers: { "X-Key": "qwerty" },
  };

  return fetch("https://apoteket-test.azurewebsites.net/api/cart", requestOptions)
    .then(response => {
      if (response.status === 200) {
        return response;
      }
      throw new Error('Something went wrong when deleting cart');
    })
}

