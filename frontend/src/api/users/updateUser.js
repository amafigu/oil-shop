import { USERS } from "#constants/api"
import axios from "axios"

export const updateUser = async (userId, propertyObj) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}${USERS}/${userId}`,
      propertyObj,
      { withCredentials: true },
    )
    return response
  } catch (error) {
    throw error
  }
}
