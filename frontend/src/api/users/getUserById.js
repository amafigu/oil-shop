import { API_USERS } from "#constants/api"
import axios from "axios"

export const getUserById = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}${API_USERS}/${id}`,
      { withCredentials: true },
    )
    return response
  } catch (error) {
    throw error
  }
}
