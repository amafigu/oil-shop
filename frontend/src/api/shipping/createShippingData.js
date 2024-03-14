import { API_SHIPPING_DATA } from "#constants/api"
import axios from "axios"

export const createShippingData = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}${API_SHIPPING_DATA}`,
      data,
    )
    return response
  } catch (error) {
    throw error
  }
}
