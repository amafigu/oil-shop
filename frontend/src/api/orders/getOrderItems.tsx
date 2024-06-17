import { ORDER_ITEMS } from "@/constants/api"
import axios from "axios"

export const getOrderItems = async (orderId: number) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}${ORDER_ITEMS}/${orderId}`,
      { withCredentials: true },
    )
    if (response && response.status === 200) {
      return response
    } else {
      throw new Error("Status error by getting order items")
    }
  } catch (error) {
    console.error("Error by getting order items")
    throw error
  }
}
