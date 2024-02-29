import { API_USERS_USER } from "#constants/api"
import axios from "axios"

export const deleteUserByEmail = async (email) => {
  try {
    const deleteUserResponse = await axios.delete(
      `${process.env.REACT_APP_API_URL}${API_USERS_USER}/${email}`,
      { withCredentials: true },
    )

    return deleteUserResponse.data
  } catch (error) {
    throw error
  }
}
