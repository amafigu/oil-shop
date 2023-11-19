import NotificationCard from "#components/NotificationCard"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import GetOrders from "../components/UsersCrud/GetOrders"
import GetShippingData from "../components/UsersCrud/GetShippingData"
import UpdateUserShippingDataForm from "../components/UsersCrud/UpdateUserShippingDataForm"
import Header from "./Admin/Header"
import styles from "./user.module.scss"

const User = () => {
  const [userData, setUserData] = useState({})
  const [, setUserShippingData] = useState({})
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
          <GetShippingData userData={userData} />
        </div>

        <div className={styles.componentContainer}>
          <UpdateUserShippingDataForm
            userId={userData.id}
            setUserShippingDataInUser={setUserShippingData}
          />
        </div>

        <div className={styles.componentContainer}>
          <GetOrders />
        </div>
      </div>
    </div>
  )
}

export default User
