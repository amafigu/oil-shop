import { USER_ROLES } from "@/constants/api"
import axios from "axios"

export const getUserRoles = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}${USER_ROLES}`,
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
