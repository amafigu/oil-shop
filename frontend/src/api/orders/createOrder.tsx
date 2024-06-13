import { ORDERS_BY_USER } from "#constants/api"
import axios from "axios"

export const createOrder = async (userId, order) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}${ORDERS_BY_USER}/${userId}`,
      order,
    )
    if (response) return response
  } catch (error) {
    console.error("Error by creating order", error)
    throw error
  }
}
