import { ROUTES_LOGIN } from "#constants/routes"
import { REDIRECT_TIMEOUT, SHORT_MESSAGE_TIMEOUT } from "#constants/time"
import useUserContext from "#context/userContext"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const useCheckIsAdmin = () => {
  const { user, isLoading } = useUserContext()
  const navigate = useNavigate()
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    let notificationTimeoutId
    let navigateTimeoutId
    if (!isLoading && user) {
      if (user.role !== "admin") {
        setNotification("you are not allowed to visit the admin page")
        notificationTimeoutId = setTimeout(
          () => setNotification(null),
          SHORT_MESSAGE_TIMEOUT,
        )
        navigateTimeoutId = setTimeout(
          () => navigate(ROUTES_LOGIN),
          REDIRECT_TIMEOUT,
        )
      }
    }
    return () => {
      clearTimeout(notificationTimeoutId)
      clearTimeout(navigateTimeoutId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, user])

  return { notification, isLoading }
}
