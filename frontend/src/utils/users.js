import { uploadToS3 } from "#api/aws/uploadToS3"
import { deleteUserById } from "#api/users/deleteUserById"
import { updateUserDataRequest } from "#api/users/updateUserDataRequest"
import { ROUTES_CART, ROUTES_CHECKOUT_PAYMENT } from "#constants/routes"
import { NORMAL_MESSAGE_TIMEOUT, SHORT_MESSAGE_TIMEOUT } from "#constants/time"
import { validateUserProperties } from "#utils/validation"
export const submitGuestUserWithOrders = async (
  e,
  cart,
  isLoggedIn,
  navigate,
  formData,
) => {
  if (cart.length > 0) {
    e.preventDefault()
    if (cart.length > 0) {
      if (!isLoggedIn) {
        navigate(ROUTES_CHECKOUT_PAYMENT, {
          state: { formData },
        })
      }
    } else {
      navigate(ROUTES_CART)
    }
  }
}

export const onCreateUser = () => {
  console.log("onCreateUser")
}

export const onDeleteUser = async (e, userId, setNotification, setCounter) => {
  e.preventDefault()
  try {
    const response = await deleteUserById(userId)

    if (response && response.status === 200) {
      if (setNotification) {
        setNotification("user deleted")
        setTimeout(() => {
          setNotification(null)
        }, NORMAL_MESSAGE_TIMEOUT)
      }
      if (setCounter) {
        setTimeout(() => {
          setCounter((prevCount) => Number(prevCount) + 1)
        }, 500)
      }
    }
  } catch (error) {
    console.error(error)
  }
}

export const onUpdateUser = async (
  e,
  key,
  userId,
  updatedUserData,
  nonUpdatedUserData,
  setUpdatedUserData,
  setNotification,
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
      setUpdatedUserData(updatedUserData)
      return
    }

    const dataRequest = await updateUserDataRequest(userId, validProperty)
    if (dataRequest && dataRequest.status === 200) {
      const updatedUser = dataRequest.data.user
      setTimeout(() => setUpdatedUserData(updatedUser), 500)
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
