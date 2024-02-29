import { API_PRODUCTS } from "#constants/api"
import axios from "axios"

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
