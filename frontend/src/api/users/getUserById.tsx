import { USERS } from "@/constants/api"
import axios from "axios"

export const getUserById = async (id: number) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}${USERS}/${id}`,
      { withCredentials: true },
    )
    if (response?.status === 200) {
      return response
    } else {
      throw new Error("Status error by getting user ")
    }
  } catch (error) {
    console.error("Error by getting user", error)
    throw error
  }
}
