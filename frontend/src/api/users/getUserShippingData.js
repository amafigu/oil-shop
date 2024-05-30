import { SHIPPING_DATA } from "#constants/api"
import axios from "axios"

export const getUserShippingData = async (userId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}${SHIPPING_DATA}/${userId}`,
      { withCredentials: true },
    )
    return response
  } catch (error) {
    throw error
  }
}
