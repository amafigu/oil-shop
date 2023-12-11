import axios from "axios"
import { useEffect } from "react"

export const getProductByName = async (
  name,
  setProductDataByName,
  setNotification,
) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/products/${name}`,
    )

    setNotification(`Selected Product: ${JSON.stringify(response.data.name)}`)
    setProductDataByName(response.data)
    setTimeout(() => setNotification(null), 2000)
  } catch (error) {
    setNotification(`Error geting user: ${error.response.data.message}`)
    setTimeout(() => setNotification(null), 2000)
    console.error("Error geting user by email", error)
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
