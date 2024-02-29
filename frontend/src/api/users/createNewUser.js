import { API_USERS_CREATE } from "#constants/api"
import axios from "axios"

export const createNewUser = async (user) => {
  try {
    const userResponse = await axios.post(
      `${process.env.REACT_APP_API_URL}${API_USERS_CREATE}`,
      user,
    )
    if (userResponse.status === 201) {
      return userResponse
    }
  } catch (error) {
    console.error("Error creating new user", error)
    throw error
  }
}
