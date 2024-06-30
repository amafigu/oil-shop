import { ORDERS_BY_USER } from "@/constants/api"
import axios from "axios"

export const getOrdersByUserId = async (userId: number) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}${ORDERS_BY_USER}/${userId}`,
      { withCredentials: true },
    )
    if (response && response.status === 200) {
      return response
    }
  } catch (error) {
    console.error("Error by getting orders", error)
    throw error
  }
}
