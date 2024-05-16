import { API_PRODUCT_CATEGORIES } from "#constants/api"
import axios from "axios"

export const getProductCategories = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}${API_PRODUCT_CATEGORIES}`,
    )
    return response
  } catch (error) {
    throw error
  }
}
