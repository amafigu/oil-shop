import { CURRENT_ADMIN } from "#constants/routes"
import { LONG_REDIRECT_TIMEOUT, SHORT_MESSAGE_TIMEOUT } from "#constants/time"
import { useUserContext } from "#context/userContext"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const useRedirectAdminFromCheckout = () => {
  const [notification, setNotification] = useState(null)
  const { user, isLoggedIn } = useUserContext()

  const navigate = useNavigate()

  useEffect(() => {
    let redirectTimeoutId
    if (user && user.role === "admin") {
      setNotification(
        "As an Admin you can not visit this page, make an customer account for that",
      )
      setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
      setTimeout(() => navigate(CURRENT_ADMIN), LONG_REDIRECT_TIMEOUT)
    }
    return () => clearTimeout(redirectTimeoutId)
  }, [user, navigate])

  return { notification, setNotification, isLoggedIn, user }
}
