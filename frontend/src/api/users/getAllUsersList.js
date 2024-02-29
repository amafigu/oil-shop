import { API_USERS } from "#constants/api"
import axios from "axios"

export const getAllUsersList = async () => {
  try {
    const getAllUsersResponse = await axios.get(
      `${process.env.REACT_APP_API_URL}${API_USERS}`,
      { withCredentials: true },
    )
    if (getAllUsersResponse.status === 200) {
      const userObjects = getAllUsersResponse.data.map((user) => ({
        ...user,
        updated: false,
      }))
      return userObjects
    }
  } catch (error) {
    throw error
  }
}
