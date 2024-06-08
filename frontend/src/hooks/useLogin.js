import { login } from "#api/auth/login"
import { getUserRole } from "#api/users/getUserRole"
import { CURRENT_ADMIN, CURRENT_CUSTOMER } from "#constants/routes"
import { REDIRECT_TIMEOUT } from "#constants/time"
import { useNotificationContext } from "#context/notificationContext"
import { useUserContext } from "#context/userContext"
import { onRequestError } from "#utils/onRequestError"
import { useNavigate } from "react-router-dom"

export const useLogin = () => {
  const { setIsLoggedIn, setUser } = useUserContext()
  const { setNotification } = useNotificationContext()
  const navigate = useNavigate()

  const setLoggedUser = async (e, email, password) => {
    e.preventDefault()

    try {
      const loginResponse = await login(email, password)
      if (loginResponse && loginResponse.status === 200) {
        const user = loginResponse.data.user
        setUser(user)
        setIsLoggedIn(true)
        const role = await getUserRole(user.roleId)
        if (role === "admin") {
          setTimeout(() => navigate(CURRENT_ADMIN), REDIRECT_TIMEOUT)
        } else {
          setTimeout(() => navigate(CURRENT_CUSTOMER), REDIRECT_TIMEOUT)
        }
      }
      if (loginResponse && loginResponse.status === 401) {
        setNotification("Email or password invalid")
        return
      }
    } catch (error) {
      const message =
        "There is an error by loggin, please check your credentials"
      onRequestError(error, setNotification, message)
    }
  }

  return {
    setLoggedUser,
  }
}
