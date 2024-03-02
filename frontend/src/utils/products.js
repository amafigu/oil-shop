import { deleteProductById } from "#api/products/deleteProductById"
import { ROUTES_PRODUCTS } from "#constants/routes"
import { SHORT_MESSAGE_TIMEOUT } from "#constants/time"

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

export const deleteProductAndUpdateState = async (
  id,
  setNotification,
  setCounter,
  text,
) => {
  try {
    const deleteProductResponse = await deleteProductById(id)

    if (deleteProductResponse) {
      setNotification(text.sucess)
      setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)

      setCounter((prevState) => prevState + 1)
    }
  } catch (error) {
    setNotification(text.fail)
    setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
    console.error("Can not delete product", error)
  }
}

export const saveProductDataAndToggleInput = async (
  e,
  asyncOnSaveFunction,
  setToggle,
) => {
  await asyncOnSaveFunction(e)
  setToggle(false)
}
