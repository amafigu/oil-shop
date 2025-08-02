import { logout } from "@/api/auth/logout"
import { LOGIN } from "@/constants/routes"
import { useNotificationContext } from "@/context/notificationContext"
import { useUserContext } from "@/context/useUserContext"
import { onRequestError } from "@/utils/onRequestError"
import { useNavigate } from "react-router-dom"

export const useLogout = () => {
  const { setUser, setIsLoggedIn } = useUserContext()
  const { setNotification } = useNotificationContext()
  const navigate = useNavigate()

  const setLogout = async () => {
    try {
      const logoutResponse = await logout()
      navigate(LOGIN)
      if (logoutResponse && logoutResponse.status === 200) {
        setUser(null)
        setIsLoggedIn(false)
      }
    } catch (error) {
      const message = "There is an error by loggin out"
      onRequestError(error, setNotification, message)
    }
  }
  return {
    setLogout,
  }
}
