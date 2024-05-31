import { USER_ROLE } from "#constants/api"
import axios from "axios"

export const getUserRole = async (roleId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}${USER_ROLE}/${roleId}`,
    )
    if (response && response.status === 200) {
      return response
    }
  } catch (error) {
    throw error
  }
}
