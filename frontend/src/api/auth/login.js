import { LOGIN } from "#constants/api"
import axios from "axios"

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}${LOGIN}`,
      { email, password },
      { withCredentials: true },
    )
    if (response && response.status === 200) {
      return response
    }
  } catch (error) {
    throw error
  }
}
