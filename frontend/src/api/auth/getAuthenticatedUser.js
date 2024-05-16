import { API_AUTH_AUTHENTICATED_USER } from "#constants/api"
import axios from "axios"

export const getAuthenticatedUser = async (userId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}${API_AUTH_AUTHENTICATED_USER}/${userId}`,
      { withCredentials: true },
    )
    return response
  } catch (error) {
    throw error
  }
}
