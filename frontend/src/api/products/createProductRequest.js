import { API_PRODUCTS_PRODUCT_CREATE } from "#constants/api"
import axios from "axios"

export const createProductRequest = async (dataObject) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}${API_PRODUCTS_PRODUCT_CREATE}`,
      dataObject,
      { withCredentials: true },
    )
    return response
  } catch (error) {
    // handle Zod backend validator messages
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
