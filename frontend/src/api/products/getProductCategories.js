import { API_PRODUCT_CATEGORIES } from "#constants/api"
import axios from "axios"

export const getProductCategories = async () => {
  const productCategoriesResponse = await axios.get(
    `${process.env.REACT_APP_API_URL}${API_PRODUCT_CATEGORIES}`,
  )
  return productCategoriesResponse
}
