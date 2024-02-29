import {
  API_LOGIN,
  API_USERS_CURRENT_USER,
  API_USER_ROLE,
  API_VERIFY_TOKEN,
} from "#constants/api"
import { getDataAndSetErrorMessage } from "#utils/dataManipulation"
import axios from "axios"

export const loginUser = async (email, password) => {
  try {
    const loginResponse = await axios.post(
      `${process.env.REACT_APP_API_URL}${API_LOGIN}`,
      { email, password },
      { withCredentials: true },
    )
    if (loginResponse && loginResponse.status === 200) {
      const currentUserIdResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}${API_VERIFY_TOKEN}`,
        { withCredentials: true },
      )

      const userId = currentUserIdResponse.data.id
      const userResponse = await getDataAndSetErrorMessage(
        userId,
        API_USERS_CURRENT_USER,
      )
      const loggedUser = userResponse.data
      if (userResponse.status === 200) {
        const userRoleResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}${API_USER_ROLE}/${loggedUser.roleId}`,
        )

        return {
          userEmail: loggedUser.email,
          isLoggedIn: true,
          user: loggedUser,
          userRole: userRoleResponse.data.name,
        }
      }
    }
  } catch (error) {
    throw error
  }
}
