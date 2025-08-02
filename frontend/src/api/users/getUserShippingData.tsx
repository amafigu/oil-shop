import { baseUrl, SHIPPING_DATA } from "@/constants/api"
import axios from "axios"

export const getUserShippingData = async (userId: number) => {
  try {
    const response = await axios.get(`${baseUrl}${SHIPPING_DATA}/${userId}`, {
      withCredentials: true,
    })
    if (response?.status === 200 || response?.status === 404) {
      return response
    }
  } catch (error) {
    console.error("Error by getting use shipping data", error)
    throw error
  }
}
