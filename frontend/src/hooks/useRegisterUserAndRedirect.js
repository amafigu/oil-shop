import { createAdmin } from "#api/users/createAdmin"
import { createUser } from "#api/users/createUser"
import { CURRENT_USER } from "#constants/api"
import { SIGN_UP_ADMIN } from "#constants/routes"
import { REDIRECT_TIMEOUT } from "#constants/time"
import useUserContext from "#context/userContext"
import { onLogin } from "#utils/onLogin"
import { onRequestHandlerError } from "#utils/onRequestHandlerError"
import { onRequestHandlerNotification } from "#utils/onRequestHandlerNotification"
import { onValidationError } from "#utils/onValidationError"
import { createUserSchema } from "#utils/usersValidation"
import { useLocation, useNavigate } from "react-router-dom"

export const useRegisterUserAndRedirect = () => {
  const { setIsLoggedIn, setUser } = useUserContext()
  const location = useLocation()
  const navigate = useNavigate()
  const currentPath = location.pathname
  const isAdmin = currentPath.includes(SIGN_UP_ADMIN)

  const registerUserAndRedirect = async (e, user, setNotification) => {
    e.preventDefault()
    try {
      let validUser
      let request
      try {
        validUser = createUserSchema.parse(user)
      } catch (error) {
        onValidationError(error, setNotification)
        return
      }
      if (isAdmin) {
        request = await createAdmin(validUser)
      } else {
        request = await createUser(validUser)
      }
      if (request && request.status === 201) {
        const newUser = request.data.user
        const response = await onLogin(newUser.email, validUser.password)
        if (response) {
          setIsLoggedIn(response.isLoggedIn)
          setUser(response.user)
          setTimeout(
            () => navigate(`${CURRENT_USER}${response.userRole}`),
            REDIRECT_TIMEOUT,
          )
        }
      }
      if (request && request.status === 422) {
        const message =
          "Can not add user, this is already existent. Please try with another email."
        onRequestHandlerNotification(setNotification, message)
      }
    } catch (error) {
      const message = "Error by creating user."
      onRequestHandlerError(error, setNotification, message)
    }
  }
  return {
    registerUserAndRedirect,
  }
}
