import { API_PRODUCTS_PRODUCT_CREATE } from "#constants/api"
import axios from "axios"

export const createProductRequest = async (product) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}${API_PRODUCTS_PRODUCT_CREATE}`,
      product,
      { withCredentials: true },
    )
    return response
  } catch (error) {
    throw error
  }
}
