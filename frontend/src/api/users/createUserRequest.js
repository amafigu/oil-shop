import { API_USERS_CREATE } from "#constants/api"
import axios from "axios"

export const createUserRequest = async (user) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}${API_USERS_CREATE}`,
    user,
  )
  return response
}
