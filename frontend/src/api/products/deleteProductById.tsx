import { PRODUCTS } from "@/constants/api"
import axios from "axios"

export const deleteProductById = async (id: number) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}${PRODUCTS}/${id}`,
      {
        withCredentials: true,
      },
    )
    return response
  } catch (error) {
    console.error("Error by deleting product", error)
    throw error
  }
}