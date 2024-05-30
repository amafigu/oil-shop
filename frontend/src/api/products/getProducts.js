import { PRODUCTS } from "#constants/api"
import axios from "axios"

export const getProducts = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}${PRODUCTS}`,
      { withCredentials: false },
    )
    if (response && response.status === 200) {
      return response
    }
  } catch (error) {
    throw error
  }
}
