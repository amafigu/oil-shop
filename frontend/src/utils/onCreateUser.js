import { uploadFile } from "#api/aws/uploadFile"
import { createUser } from "#api/users/createUser"
import { createUserSchema } from "#utils/usersValidation"
import { onRequestHandlerError } from "./onRequestHandlerError"
import { onRequestHandlerNotification } from "./onRequestHandlerNotification"
import { onValidationError } from "./onValidationError"

export const onCreateUser = async (e, user, setNotification, file) => {
  e.preventDefault()
  try {
    let image
    let validUser
    if (file) {
      image = await uploadFile(file)
      user = { ...user, image: image }
    }
    try {
      validUser = createUserSchema.parse(user)
    } catch (error) {
      onValidationError(error, setNotification)
      return
    }

    const request = await createUser(validUser)
    if (request && request.status === 201) {
      const message = "User created sucessfully!"
      onRequestHandlerNotification(setNotification, message)
      return request
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
