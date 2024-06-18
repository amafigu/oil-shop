import { LAST_ORDER } from "@/constants/api"
import axios from "axios"

export const getLastOrderItems = async (userId: number) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}${LAST_ORDER}/${userId}`,
    )
    if (response && response.status === 200) {
      return response
    } else {
      throw new Error("Status error by getting last order items")
    }
  } catch (error) {
    console.error("Error by getting last order items")
    throw error
  }
}
