import { USER_TOKEN } from "#constants/api"
import axios from "axios"

export const getRegisteredUserToken = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}${USER_TOKEN}`,
      { withCredentials: true },
    )
    if (response && response.status === 200) {
      return response
    }
  } catch (error) {
    throw error
  }
}
