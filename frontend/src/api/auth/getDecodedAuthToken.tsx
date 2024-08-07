import { USER_TOKEN } from "@/constants/api"
import axios from "axios"

export const getDecodedAuthToken = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}${USER_TOKEN}`,
      { withCredentials: true },
    )
    if (
      (response && response.status === 200) ||
      (response && response.status === 403)
    ) {
      return response
    }
  } catch (error) {
    console.error("Error by getting registered user token", error)
    throw error
  }
}
