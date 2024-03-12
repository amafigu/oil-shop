import { loginUser } from "#api/auth/loginUser"
import { createUserRequest } from "#api/users/createUserRequest"
import { API_USERS_CURRENT_PREFIX } from "#constants/api"
import { REDIRECT_TIMEOUT, SHORT_MESSAGE_TIMEOUT } from "#constants/time"
import { validateUserProperties } from "#utils/validateUserProperties"
import { useNavigate } from "react-router-dom"
import { useCurrentUser } from "./useCurrentUser"

export const useRegisterUserAndRedirect = () => {
  const navigate = useNavigate()
  const { setUser } = useCurrentUser()
  const registerUserAndRedirect = async (e, user, setMessage) => {
    e.preventDefault()
    try {
      const validUser = validateUserProperties(user, setMessage)
      const request = await createUserRequest(validUser)
      if (request && request.status === 201) {
        const newUser = request.data.user
        const loginUserResponse = await loginUser(
          newUser.email,
          validUser.password,
        )
        if (loginUserResponse) {
          setUser(newUser)
          setTimeout(
            () =>
              navigate(
                `${API_USERS_CURRENT_PREFIX}${loginUserResponse.userRole}`,
              ),
            REDIRECT_TIMEOUT,
          )
        }
      }
      if (request && request.status === 422) {
        setMessage(
          `Error by creating data: Can not add user, this is already existent. Please try with another email.`,
        )
        setTimeout(() => setMessage(null), SHORT_MESSAGE_TIMEOUT)
      }
    } catch (error) {
      console.error(error)
      if (error.response && error.response.data.message) {
        console.error(error.response.data.message)
        setMessage(`Error by creating user: ${error.response.data.message}`)
        setTimeout(() => setMessage(null), SHORT_MESSAGE_TIMEOUT)
      } else {
        setMessage("Error by creating user")
        setTimeout(() => setMessage(null), SHORT_MESSAGE_TIMEOUT)
      }
    }
  }

  return {
    registerUserAndRedirect,
  }
}
