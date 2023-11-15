import NotificationCard from "#components/NotificationCard"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import GetOrders from "../components/UsersCrud/GetOrders"
import UpdateUserShippingDataForm from "../components/UsersCrud/UpdateUserShippingDataForm"
import Header from "./Admin/Header"
import styles from "./user.module.scss"

const User = () => {
  const [userData, setUserData] = useState({})
  const [userShippingData, setUserShippingData] = useState({})
  const [showShippingData, setShowShippingData] = useState(false)
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

  const getAndShowShippingData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/user/shipping-data/${userData.id}`,
        { withCredentials: true },
      )
      setUserShippingData(response.data)
      setShowShippingData(true)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={styles.userWrapper}>
      {notification && <NotificationCard message={notification} />}

      <div className={styles.userPage}>
        <Header data={userData} />

        {showShippingData ? (
          <button
            onClick={() => setShowShippingData(false)}
            className={styles.formButton}
          >
            HIDE SHIPPING DATA{" "}
          </button>
        ) : (
          <button
            onClick={() => getAndShowShippingData()}
            className={styles.formButton}
          >
            SHOW SHIPPING DATA{" "}
          </button>
        )}

        {showShippingData && (
          <div className={styles.addressData}>
            <div>Street: {userShippingData.street}</div>
            <div>Number: {userShippingData.number}</div>
            <div>Details: {userShippingData.details}</div>
            <div>Postal Code: {userShippingData.postal_code}</div>
            <div>City: {userShippingData.city}</div>
            <div>State: {userShippingData.state}</div>
            <div>Country: {userShippingData.country}</div>
          </div>
        )}
        <UpdateUserShippingDataForm
          userId={userData.id}
          setUserShippingDataInUser={setUserShippingData}
        />
        <GetOrders />
      </div>
    </div>
  )
}

export default User
