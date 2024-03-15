import { createGuestUser } from "../api/users/createGuestUser"
import { onRequestHandlerError } from "./onRequestHandlerError"

export const onCreateGuestUser = async (user, setNotification) => {
  try {
    const response = await createGuestUser(user)
    if (response && response.status === 201) {
      return response
    }
  } catch (error) {
    const message =
      "Is not possible to create an user, try again with another email"
    onRequestHandlerError(error, setNotification, message)
  }
}
