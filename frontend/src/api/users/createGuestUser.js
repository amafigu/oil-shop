import { API_USERS_CREATE_GUEST } from "#constants/api"
import axios from "axios"

export const createGuestUser = async (guestUser) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}${API_USERS_CREATE_GUEST}`,
      guestUser,
      { withCredentials: true },
    )
    return response
  } catch (error) {
    throw error
  }
}
