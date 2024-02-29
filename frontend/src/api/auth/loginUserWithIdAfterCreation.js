import { API_LOGIN } from "#constants/api"
import axios from "axios"

export const loginUserWithIdAfterCreation = async (email, password) => {
  try {
    const loginResponse = await axios.post(
      `${process.env.REACT_APP_API_URL}${API_LOGIN}`,
      { email, password },
      { withCredentials: true },
    )

    if (loginResponse && loginResponse.status === 200) {
      return loginResponse
    }
  } catch (error) {
    throw error
  }
}
