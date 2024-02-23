import Header from "#components/ui/Header"
import NotificationCard from "#components/ui/NotificationCard"
import ShippingData from "#components/users/ShippingData"
import GetOrders from "#components/users/UsersCrud/GetOrders"
import UserData from "#components/users/UsersCrud/UserData"
import {
  REDIRECT_TIMEOUT,
  ROUTES_CURRENT_ADMIN,
  ROUTES_LOGIN,
  SHORT_MESSAGE_TIMEOUT,
} from "#constants/constants"
import useUserContext from "#context/userContext"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./user.module.scss"

const User = () => {
  const [notification, setNotification] = useState(null)
  const [headerData, setHeaderData] = useState({})
  const { user, isLoading } = useUserContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading) {
      if (user && Object.keys(user).length !== 0) {
        setHeaderData({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          image: user.image,
        })
        if (user.role === "admin") {
          navigate(ROUTES_CURRENT_ADMIN)
        }
      } else if (!user) {
        setNotification("User not logged in")
        setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
        setTimeout(() => navigate(ROUTES_LOGIN), REDIRECT_TIMEOUT)
      }
    }
  }, [isLoading, user, navigate])

  return (
    <div className={styles.userWrapper}>
      {notification && <NotificationCard message={notification} />}

      <div className={styles.userPage}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <Header data={headerData} />
            <div className={styles.componentContainer}>
              <UserData />
            </div>
            <div className={styles.componentContainer}>
              <ShippingData />
            </div>

            <div className={styles.componentContainer}>
              <GetOrders />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default User
