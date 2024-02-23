import {
  API_PRODUCTS,
  API_PRODUCTS_PRODUCT,
  API_PRODUCTS_PRODUCT_GET_BY_NAME,
  API_PRODUCT_CATEGORIES,
} from "#constants/constants"
import axios from "axios"
import { useEffect } from "react"

export const getProductByName = async (name) => {
  try {
    const getProductResponse = await axios.get(
      `${process.env.REACT_APP_API_URL}${API_PRODUCTS_PRODUCT_GET_BY_NAME}/${name}`,
    )
    return getProductResponse
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
    const productsResponse = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/products`,
        )

        setProducts(response.data)
      } catch (error) {
        console.error("Error fetching product: ", error)
      }
    }
    productsResponse()
  }, [setProducts])
}

export const getAllProductsList = async () => {
  try {
    const getAllProductsResponse = await axios.get(
      `${process.env.REACT_APP_API_URL}${API_PRODUCTS}`,
      { withCredentials: true },
    )

    if (getAllProductsResponse.status === 200) {
      const productObjects = getAllProductsResponse.data.map((product) => ({
        ...product,
        updated: false,
      }))
      return productObjects
    }
  } catch (error) {
    throw error
  }
}

export const getProductCategories = async () => {
  try {
    const productCategoriesResponse = await axios.get(
      `${process.env.REACT_APP_API_URL}${API_PRODUCT_CATEGORIES}`,
    )
    return productCategoriesResponse
  } catch (error) {
    throw error
  }
}

export const deleteProductById = async (id) => {
  try {
    const deleteProductResponse = await axios.delete(
      `${process.env.REACT_APP_API_URL}${API_PRODUCTS_PRODUCT}/${id}`,
      {
        withCredentials: true,
      },
    )
    if (deleteProductResponse) {
      return deleteProductResponse
    }
  } catch (error) {
    console.error(error)
  }
}
