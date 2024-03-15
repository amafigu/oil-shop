import { LOCAL_STORAGE_CART } from "#constants/localStorage"
import { ROUTES_CHECKOUT_ORDER_SUMMARY } from "#constants/routes"
import { SHORT_MESSAGE_TIMEOUT } from "#constants/time"
import { useCart } from "#hooks/useCart"
import { useCurrentUser } from "#hooks/useCurrentUser"
import { onSubmitGuestUserOrder } from "#utils/onSubmitGuestUserOrder"
import { onSubmitRegisteredUserOrder } from "#utils/onSubmitRegisteredUserOrder"
import { useNavigate } from "react-router-dom"

export const useSubmitOrder = () => {
  const { isLoggedIn, userId } = useCurrentUser()
  const { cart, setCart } = useCart()
  const navigate = useNavigate()

  const submitOrder = async (e, paymentMethod, formData, setNotification) => {
    e.preventDefault()
    let response
    try {
      if (isLoggedIn) {
        response = await onSubmitRegisteredUserOrder(
          userId,
          paymentMethod,
          cart,
          setNotification,
        )
      }
      if (!isLoggedIn) {
        response = await onSubmitGuestUserOrder(formData, cart)
      }
      if (response) {
        navigate(ROUTES_CHECKOUT_ORDER_SUMMARY)
        localStorage.removeItem(LOCAL_STORAGE_CART)
        setCart([])
      }
    } catch (error) {
      setNotification(error.message)
      setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
    }
  }

  return { submitOrder }
}
