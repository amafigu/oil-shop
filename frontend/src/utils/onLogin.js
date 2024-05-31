import { getAuthenticatedUser } from "#api/auth/getAuthenticatedUser"
import { getRegisteredUserToken } from "#api/auth/getRegisteredUserToken"
import { login } from "#api/auth/login"
import { getUserRole } from "#api/users/getUserRole"

export const onLogin = async (email, password) => {
  try {
    const loginResponse = await login(email, password)
    let userId
    if (loginResponse && loginResponse.status === 200) {
      const authTokenResponse = await getRegisteredUserToken()
      if (authTokenResponse && authTokenResponse.status === 200) {
        userId = authTokenResponse.data.id
      }
      const authUserResponse = await getAuthenticatedUser(userId)
      if (authUserResponse && authUserResponse.status === 200) {
        const loggedUser = authUserResponse.data
        const userRoleResponse = await getUserRole(loggedUser.roleId)
        return {
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
