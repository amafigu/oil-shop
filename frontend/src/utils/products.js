import { ROUTES_PRODUCTS } from "#constants/routes"

export const searchAndNavigateToProduct = (products, searchText, navigate) => {
  const match = products.find(
    (product) => product.name.toLowerCase() === searchText.toLowerCase(),
  )
  if (match) {
    navigate(`${ROUTES_PRODUCTS}/${match.name}`)
  } else {
    console.error("not able to navigate to product page ")
  }
}

export const navigateToProductAndCloseDropdown = (
  name,
  navigate,
  setProductDropdownVisible,
  setMatchedProducts,
  setSearchText,
) => {
  navigate(`${ROUTES_PRODUCTS}/${name}`)
  setProductDropdownVisible(false)
  setMatchedProducts([])
  setSearchText("")
}

export const filteredProducts = (products, category) =>
  products.filter(
    (product) => product.category.name === category || category === "all",
  )
