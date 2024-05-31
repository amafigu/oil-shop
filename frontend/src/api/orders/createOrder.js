import { ORDERS_BY_USER } from "#constants/api"
import axios from "axios"

export const createOrder = async (userId, order) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}${ORDERS_BY_USER}/${userId}`,
      order,
    )
    return response
  } catch (error) {
    throw error
  }
}
