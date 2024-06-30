import { PRODUCTS } from "@/constants/api"
import axios from "axios"

export const getProductById = async (id: number) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}${PRODUCTS}/${id}`,
    )
    if (response?.status === 200 || response?.status === 404) {
      return response
    }
  } catch (error) {
    console.error("Can not get product", error)
    throw error
  }
}
