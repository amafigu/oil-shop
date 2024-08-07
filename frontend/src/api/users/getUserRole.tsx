import { USER_ROLE } from "@/constants/api"
import axios from "axios"

export const getUserRole = async (roleId: number) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}${USER_ROLE}/${roleId}`,
      { withCredentials: true },
    )
    if (response && response.status === 200) {
      return response
    }
  } catch (error) {
    console.error("Error by getting user role", error)
    throw error
  }
}
