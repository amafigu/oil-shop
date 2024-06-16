import { PRODUCT_BY_NAME } from "@/constants/api"
import axios from "axios"

export const getProductByName = async (name: string) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}${PRODUCT_BY_NAME}/${name}`,
    )
    if (response?.status === 200 || response?.status === 404) {
      return response
    }
  } catch (error) {
    console.error("Error by getting product by name", error)
    throw error
  }
}
