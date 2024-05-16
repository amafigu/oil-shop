import { API_SHIPPING_DATA } from "#constants/api"
import axios from "axios"

export const createUserShippingData = async (userId, data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}${API_SHIPPING_DATA}/${userId}`,
      data,
    )
    return response
  } catch (error) {
    throw error
  }
}
