import { CREATE_ADMIN } from "#constants/api"
import axios from "axios"

export const createAdmin = async (item) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}${CREATE_ADMIN}`,
      item,
    )
    if (
      (response && response.status === 201) ||
      (response && response.status === 422)
    ) {
      return response
    }
  } catch (error) {
    console.error("Error by creating admin", error)
    throw error
  }
}
