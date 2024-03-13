import { uploadToS3 } from "#api/aws/uploadToS3"
import { updateUserDataRequest } from "#api/users/updateUserDataRequest"
import { SHORT_MESSAGE_TIMEOUT } from "#constants/time"
import { validateUserProperties } from "#utils/validateUserProperties"
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
      const toBevalidProperty = { [key]: updatedUserData[key] }
      validProperty = validateUserProperties(toBevalidProperty, setNotification)
    }
    if (!validProperty) {
      return
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
    if (error.response && error.response.data.errors) {
      if (setNotification) {
        setNotification(
          `Error by updating data: ${error.response.data.errors[0].message}`,
        )
        setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
      }
    } else {
      if (setNotification) {
        setNotification("Error by updating data")
        setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
      }
    }
  }
}
