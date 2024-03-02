import { API_PRODUCTS } from "#constants/api"
import axios from "axios"

export const getAllProducts = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}${API_PRODUCTS}`,
      { withCredentials: false },
    )

    if (response && response.status === 200) {
      return response.data
    }
  } catch (error) {
    throw error
  }
}
