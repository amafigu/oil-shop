import { baseUrl, USERS } from "@/constants/api"
import axios from "axios"

export const deleteUserById = async (id: number) => {
  try {
    const response = await axios.delete(`${baseUrl}${USERS}/${id}`, {
      withCredentials: true,
    })
    if (response?.status === 200 || response?.status === 404) {
      return response
    }
  } catch (error) {
    console.error("Error by deleting user", error)
    throw error
  }
}
