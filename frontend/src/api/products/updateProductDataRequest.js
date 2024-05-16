import { API_PRODUCTS_PRODUCT } from "#constants/api"
import axios from "axios"

export const updateProductDataRequest = async (productId, propertyObj) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}${API_PRODUCTS_PRODUCT}/${productId}`,
      propertyObj,
      { withCredentials: true },
    )
    return response
  } catch (error) {
    throw error
  }
}
