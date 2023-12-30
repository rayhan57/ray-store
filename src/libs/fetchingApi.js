export const getProducts = (sortBy = "asc") => {
  return fetch(`${import.meta.env.VITE_BASE_URL}/products?sort=${sortBy}`).then(
    (response) => response.json()
  );
};

export const getCategories = () => {
  return fetch(`${import.meta.env.VITE_BASE_URL}/products/categories`).then(
    (result) => result.json()
  );
};

export const getProductsByCategory = (category, sortBy = "asc") => {
  return fetch(
    `${
      import.meta.env.VITE_BASE_URL
    }/products/category/${category}?sort=${sortBy}`
  ).then((result) => result.json());
};
