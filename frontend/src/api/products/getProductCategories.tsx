import { PRODUCT_CATEGORIES } from "@/constants/api"
import axios from "axios"

export const getProductCategories = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}${PRODUCT_CATEGORIES}`,
    )
    if (response?.status === 200) {
      return response
    }
  } catch (error) {
    console.error("Error by getting products", error)
    throw error
  }
}
