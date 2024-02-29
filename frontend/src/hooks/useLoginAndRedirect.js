import { loginUser } from "#api/auth/loginUser"
import { API_USERS_CURRENT_PREFIX } from "#constants/api"
import { LONG_MESSAGE_TIMEOUT, REDIRECT_TIMEOUT } from "#constants/time"
import useUserContext from "#context/userContext"
import { useTranslation } from "#hooks/useTranslation"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const useLoginAndRedirect = () => {
  const { setIsLoggedIn, setUserEmail, setUser } = useUserContext()
  const [errorMessage, setErrorMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { translate } = useTranslation()
  const text = translate.pages.login
  const navigate = useNavigate()

  const loginUserAndSetState = async (e) => {
    e.preventDefault()

    try {
      const loginUserResponse = await loginUser(email, password)
      if (loginUserResponse) {
        setUserEmail(loginUserResponse.userEmail)
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
      setErrorMessage(`${text.errorMessage}`)
      setTimeout(() => setErrorMessage(null), LONG_MESSAGE_TIMEOUT)
      console.error("Login error", error)
    }
  }

  return {
    errorMessage,
    loginUserAndSetState,
    setEmail,
    setPassword,
    setShowPassword,
    showPassword,
    password,
    email,
  }
}
