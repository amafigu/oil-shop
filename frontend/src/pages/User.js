import Header from "#components/Header"
import NotificationCard from "#components/NotificationCard"
import GetOrders from "#components/UsersCrud/GetOrders"
import ShippingData from "#components/UsersCrud/ShippingData"
import UserData from "#components/UsersCrud/UserData"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./user.module.scss"
const User = () => {
  const [userData, setUserData] = useState({})
  const [notification, setNotification] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/current-user`,
          { withCredentials: true },
        )

        setUserData(response.data)
      } catch (error) {
        setNotification(`${error.response.data.message}`)
        setTimeout(() => setNotification(null), 2000)

        console.error("Error fetching user data", error)
      }
    }

    fetchUserData()
  }, [navigate])

  return (
    <div className={styles.userWrapper}>
      {notification && <NotificationCard message={notification} />}

      <div className={styles.userPage}>
        <Header data={userData} />

        <div className={styles.componentContainer}>
          <UserData userId={userData.id} />
        </div>
        <div className={styles.componentContainer}>
          <ShippingData userId={userData.id} />
        </div>

        <div className={styles.componentContainer}>
          <GetOrders />
        </div>
      </div>
    </div>
  )
}

export default User
