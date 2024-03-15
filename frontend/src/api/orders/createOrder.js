import { API_ORDERS_CREATE } from "#constants/api"
import axios from "axios"

export const createOrder = async (userId, order) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}${API_ORDERS_CREATE}/${userId}`,
      order,
    )
    return response
  } catch (error) {
    throw error
  }
}
