import { API_PRODUCTS_PRODUCT } from "#constants/api"
import { SHORT_MESSAGE_TIMEOUT } from "#constants/time"
import axios from "axios"

export const updateProductDataRequest = async (
  productId,
  product,
  setErrorMessage,
) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}${API_PRODUCTS_PRODUCT}/${productId}`,
      product,
      { withCredentials: true },
    )
    return response
  } catch (error) {
    if (error.response && error.response.data) {
      if (error.response.data.message) {
        setErrorMessage(`${error.response.data.message}`)
        setTimeout(() => setErrorMessage(null), SHORT_MESSAGE_TIMEOUT)
      }

      if (error.response.data.errors) {
        setErrorMessage(`${error.response.data.errors[0].message}`)
        setTimeout(() => setErrorMessage(null), SHORT_MESSAGE_TIMEOUT)
      }
    }
    console.error(error)
  }
}
