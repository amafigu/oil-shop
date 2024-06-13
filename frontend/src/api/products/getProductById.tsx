import { PRODUCTS } from "#constants/api"
import axios from "axios"

export const getProductById = async (id) => {
  try {
    const reponse = await axios.get(
      `${process.env.REACT_APP_API_URL}${PRODUCTS}/${id}`,
    )
    return reponse
  } catch (error) {
    console.error("Can not get product", error)
    throw error
  }
}
