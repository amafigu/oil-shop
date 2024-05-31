import { CREATE_ADMIN } from "#constants/api"
import axios from "axios"

export const createAdmin = async (admin) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}${CREATE_ADMIN}`,
      admin,
    )
    return response
  } catch (error) {
    throw error
  }
}
