import { PRODUCTS } from "#constants/api"
import axios from "axios"

export const updateProduct = async (productId, propertyObj) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}${PRODUCTS}/${productId}`,
      propertyObj,
      { withCredentials: true },
    )
    return response
  } catch (error) {
    throw error
  }
}
