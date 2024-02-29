import { API_USERS_USER } from "#constants/api"
import { ROUTES_CART, ROUTES_CHECKOUT_PAYMENT } from "#constants/routes"

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
