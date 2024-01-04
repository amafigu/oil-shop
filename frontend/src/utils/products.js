import { API_PRODUCTS_PRODUCT_GET_BY_NAME } from "#utils/constants"
import axios from "axios"
import { useEffect } from "react"

export const getProductByName = async (name) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}${API_PRODUCTS_PRODUCT_GET_BY_NAME}/${name}`,
    )
    console.log("getProductByName -> response", response)
    return response.data
  } catch (error) {
    console.error("Error geting product by name", error)
  }
}

export const searchAndNavigateToProduct = (products, searchText, navigate) => {
  const match = products.find(
    (product) => product.name.toLowerCase() === searchText.toLowerCase(),
  )
  if (match) {
    navigate(`/products/${match.name}`)
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
  navigate(`/products/${name}`)
  setProductDropdownVisible(false)
  setMatchedProducts([])
  setSearchText("")
}

export const useGetProducts = (setProducts) => {
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/products`)
      .then((response) => {
        setProducts(response.data)
      })
      .catch((e) => console.error("Error getting products data", e))
  }, [setProducts])
}
