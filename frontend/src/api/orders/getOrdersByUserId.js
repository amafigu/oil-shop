import { ORDERS_BY_USER } from "#constants/api"
import axios from "axios"

export const getOrdersByUserId = async (userId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}${ORDERS_BY_USER}/${userId}`,
      { withCredentials: true },
    )
    if (
      (response && response.status === 201) ||
      (response && response.status === 422)
    ) {
      return response
    }
  } catch (error) {
    console.error("Error by getting orders", error)
    throw error
  }
}
