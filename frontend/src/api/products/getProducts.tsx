import { PRODUCTS } from "@/constants/api"
import axios from "axios"

export const getProducts = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}${PRODUCTS}`,
    )
    console.log("API URL HOTFIX:", import.meta.env.VITE_APP_API_URL)
    if (response && response.status === 200) {
      return response
    }
  } catch (error) {
    console.error("Error by getting products", error)
    throw error
  }
}
