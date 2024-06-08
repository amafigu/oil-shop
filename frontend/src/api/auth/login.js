import { LOGIN } from "#constants/api"
import axios from "axios"

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}${LOGIN}`,
      { email, password },
    )
    if (
      (response && response.status === 200) ||
      (response && response.status === 401) ||
      (response && response.status === 404)
    ) {
      return response
    }
  } catch (error) {
    console.error("Error by login user")
    throw error
  }
}
