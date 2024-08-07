import { USERS } from "@/constants/api"
import axios from "axios"

export const getUsers = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}${USERS}`,
      { withCredentials: true },
    )
    if (response && response.status === 200) {
      return response
    }
  } catch (error) {
    console.error("Error by getting users")
    throw error
  }
}
