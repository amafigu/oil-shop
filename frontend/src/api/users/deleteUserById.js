import { API_USERS } from "#constants/api"
import axios from "axios"

export const deleteUserById = async (id) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}${API_USERS}/${id}`,
      { withCredentials: true },
    )
    return response
  } catch (error) {
    throw error
  }
}
