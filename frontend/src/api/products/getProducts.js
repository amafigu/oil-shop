import { API_PRODUCTS } from "#constants/api"
import axios from "axios"

export const getProducts = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}${API_PRODUCTS}`,
      { withCredentials: false },
    )
    return response
  } catch (error) {
    throw error
  }
}
