import {
  LONG_REDIRECT_TIMEOUT,
  ROUTES_CURRENT_ADMIN,
  SHORT_MESSAGE_TIMEOUT,
} from "#constants/constants"
import useUserContext from "#context/userContext"
import { useTranslation } from "#hooks/useTranslation"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const useCheckAdminAndRedirect = () => {
  const [notification, setNotification] = useState(null)
  const { user } = useUserContext()
  const { translate } = useTranslation()
  const text = translate.pages.cart
  const navigate = useNavigate()

  useEffect(() => {
    let redirectTimeoutId
    if (user && user.role === "admin") {
      setNotification(text.canNotBuyProducts)
      setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
      setTimeout(() => navigate(ROUTES_CURRENT_ADMIN), LONG_REDIRECT_TIMEOUT)
    }
    return () => clearTimeout(redirectTimeoutId)
  }, [user, navigate, text.canNotBuyProducts])

  return { notification }
}
