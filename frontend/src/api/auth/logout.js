import { API_LOGOUT } from "#constants/api"
import axios from "axios"

export const logout = async () => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}${API_LOGOUT}`,
      {},
      {
        withCredentials: true,
      },
    )
    if (response && response.status === 200) {
      return response
    }
  } catch (error) {
    console.error(error)
  }
}
