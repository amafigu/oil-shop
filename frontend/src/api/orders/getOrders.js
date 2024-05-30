import { ORDERS_BY_USER } from "#constants/api"
import axios from "axios"

export const getOrders = async (userId) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}${ORDERS_BY_USER}/${userId}`,

    { withCredentials: true },
  )
  return response
}
