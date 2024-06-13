import { SIGN_UP_ADMIN } from "#constants/routes"
import { useNotificationContext } from "#context/notificationContext"
import { useUserContext } from "#context/userContext"
import { useLogin } from "#hooks/useLogin"
import { onRequestError } from "#utils/onRequestError"
import { useLocation } from "react-router-dom"

export const useRegisterUser = () => {
  const { onCreateCustomer, onCreateAdmin } = useUserContext()
  const { setNotification } = useNotificationContext()
  const { setLoggedUser } = useLogin()
  const location = useLocation()
  const currentPath = location.pathname
  const isAdmin = currentPath.includes(SIGN_UP_ADMIN)

  const registerUser = async (e, data) => {
    try {
      let newUser
      if (isAdmin) {
        newUser = await onCreateAdmin(e, data)
      } else {
        newUser = await onCreateCustomer(e, data)
      }
      setLoggedUser(e, newUser.email, newUser.password)
    } catch (error) {
      console.error("Error by registering user", error)
      onRequestError(error, setNotification)
    }
  }
  return {
    registerUser,
  }
}
