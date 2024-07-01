import { PRODUCTS } from "@/constants/api"
import { Product } from "@/types/Product"
import axios from "axios"

export const updateProduct = async (
  productId: number,
  propertyObj: Product,
) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_APP_API_URL}${PRODUCTS}/${productId}`,
      propertyObj,
      { withCredentials: true },
    )
    if (response?.status === 200) {
      return response
    }
  } catch (error) {
    console.error("Error by updating user", error)
    throw error
  }
}
