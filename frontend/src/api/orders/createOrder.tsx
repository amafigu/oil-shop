import { ORDERS_BY_USER } from "@/constants/api"
import { NewOrder } from "@/types/Order"
import axios from "axios"

export const createOrder = async (userId: number, order: NewOrder) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}${ORDERS_BY_USER}/${userId}`,
      order,
    )
    if (response?.status === 201 || response?.status === 422) {
      return response
    }
  } catch (error) {
    console.error("Error by creating order", error)
    throw error
  }
}
