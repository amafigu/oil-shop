import { PRODUCTS } from "@/constants/api"
import { Product } from "@/types/Product"
import axios from "axios"

export const createProduct = async (product: Product) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}${PRODUCTS}`,
      product,
      { withCredentials: true },
    )
    return response
  } catch (error) {
    console.error("Error by creating product", error)
    throw error
  }
}
