import { API_PRODUCTS_PRODUCT } from "#constants/api"
import axios from "axios"

export const deleteProductById = async (id) => {
  try {
    const deleteProductResponse = await axios.delete(
      `${process.env.REACT_APP_API_URL}${API_PRODUCTS_PRODUCT}/${id}`,
      {
        withCredentials: true,
      },
    )
    if (deleteProductResponse) {
      return deleteProductResponse
    }
  } catch (error) {
    console.error(error)
  }
}
