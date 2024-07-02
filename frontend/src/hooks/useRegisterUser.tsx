import { SIGN_UP_ADMIN } from "@/constants/routes"
import { useNotificationContext } from "@/context/notificationContext"
import { useUserContext } from "@/context/userContext"
import { useLogin } from "@/hooks/useLogin"
import { CreateUser, User } from "@/types/User"
import { onRequestError } from "@/utils/onRequestError"
import { FormEvent } from "react"
import { useLocation } from "react-router-dom"

export const useRegisterUser = () => {
  const { onCreateCustomer, onCreateAdmin } = useUserContext()
  const { setNotification } = useNotificationContext()
  const { setLoggedUser } = useLogin()
  const location = useLocation()
  const currentPath = location.pathname
  const isAdmin = currentPath.includes(SIGN_UP_ADMIN)

  const registerUser = async (
    e: FormEvent<HTMLFormElement>,
    data: CreateUser,
  ): Promise<User> => {
    e.preventDefault()
    try {
      let newUser: User
      if (isAdmin) {
        newUser = await onCreateAdmin(e, data)
      } else {
        newUser = await onCreateCustomer(e, data)
      }
      await setLoggedUser(e, newUser.email, newUser.password)
      return newUser
    } catch (error) {
      console.error("Error by registering user", error)
      onRequestError(error, setNotification)
      throw error // Ensure that the function returns a rejected promise in case of an error
    }
  }

  return {
    registerUser,
  }
}
