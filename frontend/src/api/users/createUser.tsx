import { USERS } from "@/constants/api"
import { User } from "@/types/User"
import axios from "axios"

export const createUser = async (user: User) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}${USERS}`,
      user,
    )
    if (
      (response && response.status === 201) ||
      (response && response.status === 422)
    ) {
      return response
    }
  } catch (error) {
    console.error("Error by creating user", error)
    throw error
  }
}
