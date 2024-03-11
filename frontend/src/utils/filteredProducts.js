export const filteredProducts = (products, category) =>
  products.filter(
    (product) => product.category.name === category || category === "all",
  )
