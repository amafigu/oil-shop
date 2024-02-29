import { API_USERS_CREATE_ADMIN } from "#constants/api"
import axios from "axios"

export const createNewAdmin = async (user) => {
  try {
    const adminResponse = await axios.post(
      `${process.env.REACT_APP_API_URL}${API_USERS_CREATE_ADMIN}`,
      user,
    )
    if (adminResponse.status === 201) {
      return adminResponse
    }
  } catch (error) {
    console.error("Error creating new admin", error)
    throw error
  }
}
