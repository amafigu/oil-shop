import { API_USERS_USER } from "#constants/api"

export const updateUserDataAndSetStates = async (
  e,
  propertyName,
  file,
  uploadToS3,
  updatedUserData,
  setUpdatedUserData,
  updateDataAndSetStates,
  userToUpdateId,
  setNonUpdatedUserData,
  setNotification,
) => {
  let image = ""
  if (file) {
    image = await uploadToS3(file)
  }

  let updatedUserDataWithImage = { ...updatedUserData, image }
  setUpdatedUserData(updatedUserDataWithImage)

  const updatedData = await updateDataAndSetStates(
    e,
    propertyName,
    userToUpdateId,
    API_USERS_USER,
    setNonUpdatedUserData,
    updatedUserDataWithImage,
    setUpdatedUserData,
    setNotification,
  )
  if (!updatedData) {
    return
  }
  setUpdatedUserData(updatedData.data.user)
}
