import { USERS } from "#constants/api"
import axios from "axios"

export const updateUser = async (id, property) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}${USERS}/${id}`,
      property,
      { withCredentials: true },
    )
    if (
      (response && response.status === 200) ||
      (response && response.status === 400) ||
      (response && response.status === 404)
    )
      return response
  } catch (error) {
    console.error("Error by updating user", error)
    throw error
  }
}
