import { OrdersList } from "#components/orders/OrdersList"
import NotificationCard from "#components/ui/NotificationCard"
import { UserHeader } from "#components/ui/UserHeader"
import { ROUTES_CURRENT_ADMIN, ROUTES_LOGIN } from "#constants/routes"
import { REDIRECT_TIMEOUT, SHORT_MESSAGE_TIMEOUT } from "#constants/time"
import useUserContext from "#context/userContext"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ShippingData } from "./ShippingData"
import { UserData } from "./UserData"
import styles from "./user.module.scss"

export const User = () => {
  const [notification, setNotification] = useState(null)
  const { user, isLoading } = useUserContext()
  const navigate = useNavigate()

  useEffect(() => {
    let notificationTimeoutId
    let navigateTimeoutId
    if (!isLoading && user) {
      if (user.role === "admin") {
        navigate(ROUTES_CURRENT_ADMIN)
      } else if (!user) {
        setNotification("User not logged in")
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
  }, [isLoading, user, navigate])

  return (
    <main
      className={styles.userPageWrapper}
      aria-label='Customer Management Page'
    >
      <div className={styles.userPage}>
        {notification && <NotificationCard message={notification} />}
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <UserHeader />
            <section className={styles.componentContainer}>
              <UserData />
            </section>
            <section className={styles.componentContainer}>
              <ShippingData />
            </section>
            <section className={styles.componentContainer}>
              <OrdersList />
            </section>
          </>
        )}
      </div>
    </main>
  )
}
