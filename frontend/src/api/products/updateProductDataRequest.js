import { API_PRODUCTS_PRODUCT } from "#constants/api"
import axios from "axios"

export const updateProductDataRequest = async (productId, propertyObj) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}${API_PRODUCTS_PRODUCT}/${productId}`,
      propertyObj,
      { withCredentials: true },
    )
    return response
  } catch (error) {
    if (error.response && error.response.dataconsole.error) {
      if (error.response.data.message) {
        console.error(`${error.response.data.message}`)
      }
      if (error.response.data.errors) {
        console.error(`${error.response.data.errors[0].message}`)
      }
    }
    console.error(error)
  }
}
