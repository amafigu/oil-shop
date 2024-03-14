import { verifyToken } from "#api/auth/verifyToken"
import { deleteUserById } from "#api/users/deleteUserById"
import { onRequestHandlerError } from "./onRequestHandlerError"
import { onRequestHandlerNotification } from "./onRequestHandlerNotification"

export const onDeleteUser = async (e, userId, setNotification, setCounter) => {
  e.preventDefault()

  try {
    const authToken = await verifyToken()
    if (authToken && authToken === userId) {
      const message = "You can not delete yourself"
      onRequestHandlerNotification(setNotification, message, setCounter)
      return
    }

    const response = await deleteUserById(userId)

    if (response && response.status === 200) {
      const message = "User deleted"
      onRequestHandlerNotification(setNotification, message, setCounter)
    }
  } catch (error) {
    const message = "Error by deleting user."
    onRequestHandlerError(error, setNotification, message)
  }
}
