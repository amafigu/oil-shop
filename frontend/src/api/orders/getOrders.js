import { API_ORDERS_ALL } from "#constants/api"
import axios from "axios"

export const getOrders = async (userId) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}${API_ORDERS_ALL}/${userId}`,

    { withCredentials: true },
  )
  return response
}
