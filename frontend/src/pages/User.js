import Header from "#components/Header"
import NotificationCard from "#components/NotificationCard"
import GetOrders from "#components/UsersCrud/GetOrders"
import ShippingData from "#components/UsersCrud/ShippingData"
import UserData from "#components/UsersCrud/UserData"
import useUserContext from "#context/userContext"
import axios from "axios"

import { API_USER_CUSTOMER } from "#utils/constants"
import { getDataAndSetErrorMessage } from "#utils/utils"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./user.module.scss"
const User = () => {
  const [notification, setNotification] = useState(null)

  const navigate = useNavigate()
  const { setUser, user } = useUserContext()
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUserIdResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/current`,
          { withCredentials: true },
        )
        console.log("userResponse", currentUserIdResponse.data.id)

        const userId = currentUserIdResponse.data.id

        const userResponse = await getDataAndSetErrorMessage(
          userId,
          API_USER_CUSTOMER,
          setNotification,
        )
        const loggedUser = userResponse.data

        if (userResponse.status === 200) {
          setUser(loggedUser)
        }
      } catch (error) {
        setNotification(`aa`)
        //setNotification(`${error.response.data.message}`)
        setTimeout(() => setNotification(null), 2000)

        console.error("Error fetching user data", error)
      }
    }

    fetchUserData()
  }, [navigate, setUser])

  console.log("CONTEXT USER", user)
  const dataForHeader = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    image: user.image,
  }

  console.log("CONTEXT USER HEADER", dataForHeader)
  console.log("CONTEXT USER", user.id)

  return (
    <div className={styles.userWrapper}>
      {notification && <NotificationCard message={notification} />}

      <div className={styles.userPage}>
        <Header data={dataForHeader} />

        <div className={styles.componentContainer}>
          <UserData />
        </div>
        <div className={styles.componentContainer}>
          <ShippingData userId={user.id} />
        </div>

        <div className={styles.componentContainer}>
          <GetOrders />
        </div>
      </div>
    </div>
  )
}

export default User
