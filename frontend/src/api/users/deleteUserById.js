import { API_USERS } from "#constants/api"
import axios from "axios"

export const deleteUserById = async (id) => {
  try {
    const deleteUserResponse = await axios.delete(
      `${process.env.REACT_APP_API_URL}${API_USERS}/${id}`,
      { withCredentials: true },
    )
    return deleteUserResponse
  } catch (error) {
    throw error
  }
}
