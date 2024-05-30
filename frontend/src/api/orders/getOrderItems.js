import { API_ORDERS_CART_ITEMS } from "#constants/api"
import axios from "axios"

export const getOrderItems = async (orderId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}${API_ORDERS_CART_ITEMS}/${orderId}`,
      { withCredentials: true },
    )
    return response
  } catch (error) {
    throw error
  }
}
