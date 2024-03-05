import { API_USERS } from "#constants/api"
import axios from "axios"

export const getAllUsers = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}${API_USERS}`,
      { withCredentials: true },
    )
    if (response.status === 200) {
      return response
    }
  } catch (error) {
    throw error
  }
}
