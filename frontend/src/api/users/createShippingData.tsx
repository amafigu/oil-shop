import { baseUrl, SHIPPING_DATA } from "@/constants/api"
import { UserShippingData } from "@/types/User"
import axios from "axios"

export const createShippingData = async (
  userId: number,
  data: UserShippingData,
) => {
  try {
    const response = await axios.post(
      `${baseUrl}${SHIPPING_DATA}/${userId}`,
      data,
    )
    if (response?.status === 201) {
      return response.data
    }
  } catch (error) {
    console.error("Error by creating shipping data", error)
    throw error
  }
}
