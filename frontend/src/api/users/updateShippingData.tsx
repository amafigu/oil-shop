import { SHIPPING_DATA } from "@/constants/api"
import { EditShippingData } from "@/types/User"
import axios from "axios"

export const updateShippingData = async (
  userId: number,
  data: EditShippingData,
) => {
  console.log("updateShippingData data", data)
  console.log("updateShippingData userId", userId)
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_APP_API_URL}${SHIPPING_DATA}/${userId}`,
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
