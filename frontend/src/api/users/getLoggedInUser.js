import { API_USERS_CURRENT_USER } from "#constants/api"
import axios from "axios"

export const getLoggedInUser = async (userId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}${API_USERS_CURRENT_USER}/${userId}`,
      { withCredentials: true },
    )
    return response
  } catch (error) {
    throw error
  }
}
