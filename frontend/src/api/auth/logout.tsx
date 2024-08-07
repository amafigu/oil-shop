import { LOGOUT } from "@/constants/api"
import axios from "axios"

export const logout = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}${LOGOUT}`,
      {},
      {
        withCredentials: true,
      },
    )
    if (response && response.status === 200) {
      return response
    }
  } catch (error) {
    console.error("Error by logout", error)
    console.error(error)
  }
}
