import { API_ORDERS_LAST_ORDER_ITEMS } from "#constants/api"
import axios from "axios"

export const getLastOrderItems = async (userId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}${API_ORDERS_LAST_ORDER_ITEMS}/${userId}`,
    )
    return response
  } catch (error) {
    throw error
  }
}
