import Header from "#components/Header"
import NotificationCard from "#components/NotificationCard"
import GetOrders from "#components/UsersCrud/GetOrders"
import ShippingData from "#components/UsersCrud/ShippingData"
import UserData from "#components/UsersCrud/UserData"
import useUserContext from "#context/userContext"
import { REDIRECT_TIMEOUT, ROUTES_LOGIN } from "#utils/constants"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SHORT_MESSAGE_TIMEOUT } from "../utils/constants"
import styles from "./user.module.scss"

const User = () => {
  const [notification, setNotification] = useState(null)
  const [headerData, setHeaderData] = useState({})
  const { user, isLoading } = useUserContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && user) {
      setHeaderData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image,
      })
    }

    if (!user) {
      setNotification("User not logged in")
      setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
      setTimeout(() => navigate(ROUTES_LOGIN), REDIRECT_TIMEOUT)
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
