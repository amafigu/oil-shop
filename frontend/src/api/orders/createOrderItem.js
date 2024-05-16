import { API_ORDERS_CART_ITEMS } from "#constants/api"
import axios from "axios"

export const createOrderItem = async (order) => {
  try {
    const orderItem = await axios.post(
      `${process.env.REACT_APP_API_URL}${API_ORDERS_CART_ITEMS}`,
      order,
    )
    return orderItem
  } catch (error) {
    throw error
  }
}
