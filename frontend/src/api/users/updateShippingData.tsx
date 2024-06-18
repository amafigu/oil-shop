import { SHIPPING_DATA } from "@/constants/api"
import { ShippingData } from "@/types/User"
import axios from "axios"

export const updateShippingData = async (
  userId: number,
  data: Partial<ShippingData>,
) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}${SHIPPING_DATA}/${userId}`,
      data,
      { withCredentials: true },
    )
    if (response?.status === 200) {
      return response
    }
  } catch (error) {
    console.error("Error by updating shipping data", error)
    throw error
  }
}
