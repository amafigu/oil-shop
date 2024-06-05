import { ORDER_ITEMS } from "#constants/api"
import axios from "axios"

export const createOrderItem = async (order) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}${ORDER_ITEMS}`,
      order,
    )
    if (response && response.status === 201) {
      return response
    }
  } catch (error) {
    console.error("Error by creating order item", error)
    throw error
  }
}
