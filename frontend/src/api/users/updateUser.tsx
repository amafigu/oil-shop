import { USERS } from "@/constants/api"
import axios from "axios"

export const updateUser = async (id: number, data: object) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_APP_API_URL}${USERS}/${id}`,
      data,
      { withCredentials: true },
    )
    if (
      (response && response.status === 200) ||
      (response && response.status === 400) ||
      (response && response.status === 404)
    )
      return response
  } catch (error) {
    console.error("Error by updating user", error)
    throw error
  }
}
