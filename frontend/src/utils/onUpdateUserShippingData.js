import { updateUserShippingDataRequest } from "#api/users/updateUserShippingDataRequest"
import { SHORT_MESSAGE_TIMEOUT } from "#constants/time"
import { validateUserShippingDataProperties } from "#utils/validateUserShippingDataProperties"

export const onUpdateUserShippingData = async (
  e,
  key,
  userId,
  updatedUserShippingData,
  nonUpdatedUserShippingData,
  setUpdatedUserShippingData,
  setNonUpdatedUserData,
  setNotification,
) => {
  e.preventDefault()
  try {
    let validProperty

    const toBevalidProperty = { [key]: updatedUserShippingData[key] }
    validProperty = validateUserShippingDataProperties(
      toBevalidProperty,
      setNotification,
    )

    if (!validProperty) {
      return
    }

    const dataRequest = await updateUserShippingDataRequest(
      userId,
      validProperty,
    )
    if (dataRequest && dataRequest.status === 200) {
      const updatedShippingData = dataRequest.data
      setUpdatedUserShippingData(updatedShippingData)
      setNonUpdatedUserData(updatedShippingData)
      return updatedShippingData
    }
  } catch (error) {
    setUpdatedUserShippingData(nonUpdatedUserShippingData)
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
