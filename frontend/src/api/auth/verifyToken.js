import { API_VERIFY_TOKEN } from "#constants/api"
import axios from "axios"

export const verifyToken = async () => {
  try {
    const verifyTokenResponse = await axios.get(
      `${process.env.REACT_APP_API_URL}${API_VERIFY_TOKEN}`,
      { withCredentials: true },
    )
    if (
      verifyTokenResponse &&
      verifyTokenResponse.status === 200 &&
      verifyTokenResponse.data.id
    ) {
      return verifyTokenResponse.data.id
    }
    return null
  } catch (error) {
    console.error("Error verifying token", error)
    return null
  }
}
