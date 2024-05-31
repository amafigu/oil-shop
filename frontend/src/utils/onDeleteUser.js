import { getRegisteredUserToken } from "#api/auth/getRegisteredUserToken"
import { deleteUserById } from "#api/users/deleteUserById"
import { onRequestHandlerError } from "./onRequestHandlerError"
import { onRequestHandlerNotification } from "./onRequestHandlerNotification"

export const onDeleteUser = async (e, userId, setNotification) => {
  e.preventDefault()
  try {
    const authToken = await getRegisteredUserToken()
    if (authToken && authToken.status === 200) {
      if (authToken && authToken.data.id === userId) {
        const message = "You can not delete yourself"
        onRequestHandlerNotification(setNotification, message)
        return
      }
    }
    const response = await deleteUserById(userId)
    if (response && response.status === 200) {
      const message = "User deleted"
      onRequestHandlerNotification(setNotification, message)
      return response
    }
  } catch (error) {
    const message = "Error by deleting user."
    onRequestHandlerError(error, setNotification, message)
  }
}
