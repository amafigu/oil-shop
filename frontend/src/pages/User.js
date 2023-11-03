import NotificationCard from "#components/NotificationCard"
import useUserContext from "#context/userContext"
import { logout } from "#utils/utils"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import UpdateUserShippingDataForm from "../components/UsersCrud/UpdateUserShippingDataForm"
import styles from "./user.module.scss"

const User = () => {
  const [userData, setUserData] = useState({})
  const [userShippingData, setUserShippingData] = useState({})
  const [showShippingData, setShowShippingData] = useState(false)
  const [notification, setNotification] = useState(null)

  const { setUserEmail, setIsLoggedIn, userEmail, isLoggedIn, user } =
    useUserContext()

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/current-user`,
          { withCredentials: true },
        )

        console.log("User response.data ", response.data)
        if (response.data.role === "admin") {
          navigate("/users/current-admin")
        }

        if (response.data.role === "guest") {
          navigate("/users/current-user")
        } else {
          navigate("/login")
        }
        setUserData(response.data)
      } catch (error) {
        setNotification(`${error.response.data.message}`)
        setTimeout(() => setNotification(null), 2000)
        setTimeout(() => navigate("/login"), 2500)
        console.error("Error fetching user data", error)
      }
    }

    fetchUserData()
  }, [navigate])

  console.log("USER PAGE userData", userData)
  console.log("USER PAGE isLoggedIn ", isLoggedIn)
  console.log("USER PAGE userEmail ", userEmail)

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
        <div className={styles.titleAndLogoutButtonContainer}>
          <div className={styles.adminFormTitel}>
            {`Hello ${userData.firstName} ${userData.lastName}`}
          </div>
          <button
            className={styles.logoutButton}
            onClick={() =>
              logout(
                navigate,
                setNotification,
                setIsLoggedIn,
                setUserEmail,
                user,
              )
            }
          >
            LOGOUT
          </button>
        </div>
        <div className={styles.userData}>
          {userData ? (
            <div className={styles.userDataContainer}>
              <img className={styles.avatar} src={userData.image} alt='user' />
              <div className={styles.userData}>
                <div>Email: {userData.email}</div>
                <div>First Name: {userData.firstName}</div>
                <div>Last Name: {userData.lastName}</div>
              </div>
            </div>
          ) : (
            `loading data ...`
          )}
        </div>
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
      </div>
    </div>
  )
}

export default User
