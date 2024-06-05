import { PRODUCTS } from "#constants/api"
import axios from "axios"

export const createProduct = async (product) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}${PRODUCTS}`,
      product,
      { withCredentials: true },
    )
    return response
  } catch (error) {
    console.error("Can not create product", error)
    throw error
  }
}
