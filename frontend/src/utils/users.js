import { uploadToS3 } from "#api/aws/uploadToS3"
import { createUserRequest } from "#api/users/createUserRequest"
import { deleteUserById } from "#api/users/deleteUserById"
import { updateUserDataRequest } from "#api/users/updateUserDataRequest"
import { updateUserShippingDataRequest } from "#api/users/updateUserShippingDataRequest"
import { ROUTES_CART, ROUTES_CHECKOUT_PAYMENT } from "#constants/routes"
import {
  NORMAL_MESSAGE_TIMEOUT,
  PROCESS_TIMEOUT,
  SHORT_MESSAGE_TIMEOUT,
} from "#constants/time"
import {
  validateUserProperties,
  validateUserShippingDataProperties,
} from "#utils/validation"

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

export const onCreateUser = async (e, user, setMessage, file, setCounter) => {
  e.preventDefault()
  try {
    let image
    if (file) {
      image = await uploadToS3(file)
      user = { ...user, image: image }
    }
    const validUser = validateUserProperties(user, setMessage)
    const request = await createUserRequest(validUser)
    if (request && request.status === 201) {
      setMessage(`User created sucessfully!`)
      setTimeout(() => setMessage(null), SHORT_MESSAGE_TIMEOUT)
      setTimeout(
        () => setCounter((prevCount) => prevCount + 1),
        PROCESS_TIMEOUT,
      )
      return request
    }
    if (request && request.status === 422) {
      setMessage(
        `Error by creating data: Can not add user, this is already existent. Please try with another email.`,
      )
      setTimeout(() => setMessage(null), SHORT_MESSAGE_TIMEOUT)
    }
  } catch (error) {
    console.error(error)
    if (error.response && error.response.data.message) {
      console.error(error.response.data.message)
      setMessage(`Error by creating user: ${error.response.data.message}`)
      setTimeout(() => setMessage(null), SHORT_MESSAGE_TIMEOUT)
    } else {
      setMessage("Error by creating user")
      setTimeout(() => setMessage(null), SHORT_MESSAGE_TIMEOUT)
    }
  }
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
  setNonUpdatedUserData,
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
      return
    }

    const dataRequest = await updateUserDataRequest(userId, validProperty)
    if (dataRequest && dataRequest.status === 200) {
      const updatedUser = dataRequest.data.user
      setUpdatedUserData(updatedUser)
      setNonUpdatedUserData(updatedUser)
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
