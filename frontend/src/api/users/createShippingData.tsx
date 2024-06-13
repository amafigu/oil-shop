import { SHIPPING_DATA } from "#constants/api"
import axios from "axios"

export const createShippingData = async (userId, data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}${SHIPPING_DATA}/${userId}`,
      data,
    )
    return response
  } catch (error) {
    throw error
  }
}
