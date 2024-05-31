import { USERS } from "#constants/api"
import axios from "axios"

export const createUser = async (user) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}${USERS}`,
      user,
    )
    return response
  } catch (error) {
    throw error
  }
}
