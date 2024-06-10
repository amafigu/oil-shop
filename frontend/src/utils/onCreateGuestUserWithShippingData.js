import { PAYMENT } from "#constants/routes"
import { onCreateGuestUser } from "./onCreateGuestUser"
import { onCreateShippingData } from "./onCreateShippingData"
import { onRequestError } from "./onRequestError"

export const onCreateGuestUserWithShippingData = async (
  e,
  setNotification,
  formData,
  navigate,
) => {
  e.preventDefault()
  const shippingFormData = {
    street: formData.street,
    number: formData.number,
    details: formData.details,
    postalCode: formData.postalCode,
    city: formData.city,
    state: formData.state,
    country: formData.country,
  }

  const userFormData = {
    email: formData.email,
    firstName: formData.firstName,
    lastName: formData.lastName,
    password: "",
  }

  try {
    const guestResponse = await onCreateGuestUser(userFormData)
    if (guestResponse && guestResponse.status === 201) {
      const userId = guestResponse.data.id
      const shippingDataResponse = await onCreateShippingData(
        userId,
        shippingFormData,
      )
      if (shippingDataResponse) {
        navigate(PAYMENT)
      }
    }
  } catch (error) {
    onRequestError(error, setNotification)
  }
}
