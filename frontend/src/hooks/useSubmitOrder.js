import { LOCAL_STORAGE_CART } from "#constants/localStorage"
import { ORDER_SUMMARY } from "#constants/routes"
import { SHORT_MESSAGE_TIMEOUT } from "#constants/time"
import { useCart } from "#hooks/useCart"
import { useCurrentUser } from "#hooks/useCurrentUser"
import { onSubmitRegisteredUserOrder } from "#utils/onSubmitRegisteredUserOrder"
import { useNavigate } from "react-router-dom"

export const useSubmitOrder = () => {
  const { isLoggedIn, user } = useCurrentUser()
  const { cart, setCart } = useCart()
  const navigate = useNavigate()

  const submitOrder = async (e, paymentMethod, setNotification) => {
    e.preventDefault()
    let response
    let validUserId
    try {
      if (isLoggedIn) {
        validUserId = user.id
      }
      response = await onSubmitRegisteredUserOrder(
        validUserId,
        paymentMethod,
        cart,
        setNotification,
      )
      if (response) {
        navigate(ORDER_SUMMARY)
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
