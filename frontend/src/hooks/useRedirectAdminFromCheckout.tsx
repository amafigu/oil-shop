import { CURRENT_ADMIN } from "@/constants/routes"
import { LONG_REDIRECT_TIMEOUT, SHORT_MESSAGE_TIMEOUT } from "@/constants/time"
import { useNotificationContext } from "@/context/notificationContext"
import { useUserContext } from "@/context/useUserContext"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const useRedirectAdminFromCheckout = () => {
  const { setNotification } = useNotificationContext()
  const { user, isLoggedIn } = useUserContext()

  const navigate = useNavigate()

  useEffect(() => {
    let redirectTimeoutId: string | number | NodeJS.Timeout | undefined
    if (user?.role?.name === "admin") {
      setNotification(
        "As an Admin you can not visit this page, make an customer account for that",
      )
      setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
      setTimeout(() => navigate(CURRENT_ADMIN), LONG_REDIRECT_TIMEOUT)
    }
    return () => clearTimeout(redirectTimeoutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate])

  return { setNotification, isLoggedIn, user }
}
