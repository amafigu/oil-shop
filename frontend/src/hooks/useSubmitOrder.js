import { ROUTES_CHECKOUT_ORDER_SUMMARY } from "#constants/routes"
import { REDIRECT_TIMEOUT, SHORT_MESSAGE_TIMEOUT } from "#constants/time"
import useCartContext from "#context/cartContext"
import { useTranslation } from "#hooks/useTranslation"
import { submitOrderAndGuestUser } from "#utils/users"
import { useNavigate } from "react-router-dom"

export const useSubmitOrder = () => {
  const navigate = useNavigate()
  const { setCart } = useCartContext()
  const { translate } = useTranslation()
  const text = translate.pages.payment

  const submitOrder = async (
    e,
    isLoggedIn,
    userId,
    paymentMethod,
    setNotification,
    formData,
  ) => {
    e.preventDefault()

    const stateShippingDataObject = {
      street: formData.street,
      number: formData.number,
      details: formData.details,
      postalCode: formData.postalCode,
      city: formData.city,
      state: formData.state,
      country: formData.country,
    }

    const registeredUserEmptyShippingDataObject = {
      street: text.emptyShippingData,
      number: text.emptyShippingData,
      details: text.emptyShippingData,
      postalCode: text.emptyShippingData,
      city: text.emptyShippingData,
      state: text.emptyShippingData,
      country: text.emptyShippingData,
    }
    try {
      const orderResponse = await submitOrderAndGuestUser(
        isLoggedIn,
        formData,
        userId,
        stateShippingDataObject,
        registeredUserEmptyShippingDataObject,
        paymentMethod,
      )

      if (orderResponse) {
        setCart([])
        setTimeout(
          () => navigate(ROUTES_CHECKOUT_ORDER_SUMMARY),
          REDIRECT_TIMEOUT,
        )
      }
    } catch (error) {
      setNotification(error.message)
      setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
    }
  }

  return { submitOrder }
}
