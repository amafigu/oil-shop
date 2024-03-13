import { uploadToS3 } from "#api/aws/uploadToS3"
import { updateUserDataRequest } from "#api/users/updateUserDataRequest"
import { updateUserSchema } from "#utils/usersValidation"
import { onRequestHandlerError } from "./onRequestHandlerError"
import { onValidationError } from "./onValidationError"
import { updateEditableItemData } from "./updateEditableItemData"

export const onUpdateUser = async (
  e,
  key,
  userId,
  updatedUserData,
  nonUpdatedUserData,
  setUpdatedUserData,
  setNonUpdatedUserData,
  setNotification,
  setCounter,
  file,
) => {
  e.preventDefault()
  try {
    let validProperty
    let image

    if (key === "image" && file) {
      image = await uploadToS3(file)
      validProperty = { [key]: image }
    } else {
      try {
        let toBevalidProperty = { [key]: updatedUserData[key] }
        validProperty = updateUserSchema.parse(toBevalidProperty)
      } catch (error) {
        onValidationError(error, setNotification)
        return
      }
    }

    const dataRequest = await updateUserDataRequest(userId, validProperty)
    if (dataRequest && dataRequest.status === 200) {
      const updatedUser = dataRequest.data.user
      updateEditableItemData(
        setUpdatedUserData,
        setNonUpdatedUserData,
        updatedUser,
        setCounter,
      )
      return updatedUser
    }
  } catch (error) {
    setUpdatedUserData(nonUpdatedUserData)
    const message = "Error by updating user"
    onRequestHandlerError(error, setNotification, message)
  }
}
