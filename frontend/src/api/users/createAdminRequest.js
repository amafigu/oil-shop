import { API_USERS_CREATE_ADMIN } from "#constants/api"
import axios from "axios"

export const createAdminRequest = async (admin) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}${API_USERS_CREATE_ADMIN}`,
      admin,
    )
    return response
  } catch (error) {
    throw error
  }
}
