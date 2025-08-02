import { baseUrl, SHIPPING_DATA } from "@/constants/api"
import { ShippingData } from "@/types/User"
import axios from "axios"

export const createShippingData = async (
  userId: number,
  data: ShippingData,
) => {
  try {
    const response = await axios.post(
      `${baseUrl}${SHIPPING_DATA}/${userId}`,
      data,
    )
    if (response?.status === 201) {
      return response
    }
  } catch (error) {
    console.error("Error by creating product", error)
    throw error
  }
}
