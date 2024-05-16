import { API_USERS_CURRENT_PREFIX } from "#constants/api"
import { REDIRECT_TIMEOUT } from "#constants/time"
import useUserContext from "#context/userContext"
import { onLogin } from "#utils/onLogin"
import { onRequestHandlerError } from "#utils/onRequestHandlerError"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const useLoginAndRedirect = () => {
  const { setIsLoggedIn, setUser } = useUserContext()
  const [notification, setNotification] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const loginUserAndSetState = async (e) => {
    e.preventDefault()

    try {
      const loginUserResponse = await onLogin(email, password)
      if (loginUserResponse) {
        setIsLoggedIn(loginUserResponse.isLoggedIn)
        setUser(loginUserResponse.user)
        setTimeout(
          () =>
            navigate(
              `${API_USERS_CURRENT_PREFIX}${loginUserResponse.userRole}`,
            ),
          REDIRECT_TIMEOUT,
        )
      }
    } catch (error) {
      const message =
        "There is an error by loggin, please check your credentials"
      onRequestHandlerError(error, setNotification, message)
    }
  }

  return {
    notification,
    loginUserAndSetState,
    setEmail,
    setPassword,
    setShowPassword,
    showPassword,
    password,
    email,
  }
}
