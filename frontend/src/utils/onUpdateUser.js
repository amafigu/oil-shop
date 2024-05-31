import { uploadFile } from "#api/aws/uploadFile"
import { updateUser } from "#api/users/updateUser"
import { updateUserSchema } from "#utils/usersValidation"
import { onRequestHandlerError } from "./onRequestHandlerError"
import { onValidationError } from "./onValidationError"

export const onUpdateUser = async (
  e,
  key,
  userId,
  itemInitialAttributes,
  updatedUserData,
  setUpdatedUserData,
  setNotification,
  file,
) => {
  e.preventDefault()
  try {
    let validProperty
    let image

    if (key === "image" && file) {
      image = await uploadFile(file)
      validProperty = { [key]: image }
    } else {
      try {
        let toBevalidProperty = { [key]: updatedUserData[key] }
        validProperty = updateUserSchema.parse(toBevalidProperty)
      } catch (error) {
        setUpdatedUserData(itemInitialAttributes)
        onValidationError(error, setNotification)
        return
      }
    }

    const response = await updateUser(userId, validProperty)
    if (response && response.status === 200) {
      const updatedUser = response.data.user
      setUpdatedUserData(updatedUser)
      return response
    }
  } catch (error) {
    setUpdatedUserData(itemInitialAttributes)
    const message = "Error by updating user"
    onRequestHandlerError(error, setNotification, message)
  }
}
