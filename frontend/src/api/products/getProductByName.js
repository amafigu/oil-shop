import { API_PRODUCTS_PRODUCT_GET_BY_NAME } from "#constants/api"
import axios from "axios"

export const getProductByName = async (name) => {
  try {
    const reponse = await axios.get(
      `${process.env.REACT_APP_API_URL}${API_PRODUCTS_PRODUCT_GET_BY_NAME}/${name}`,
    )
    return reponse
  } catch (error) {
    throw error
  }
}
