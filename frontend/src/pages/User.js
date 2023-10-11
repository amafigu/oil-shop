import NotificationCard from "#components/NotificationCard"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import style from "./user.module.scss"

const User = () => {
  const [userData, setUserData] = useState(null)
  const [notification, setNotification] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/current-user`,
          { withCredentials: true },
        )
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

  return (
    <div className=''>
      <div className=''>
        {notification && <NotificationCard message={notification} />}

        <div className={style.pageTitle}>
          {userData
            ? `Hello, ${userData.firstName} ${userData.lastName} you are loggin as a ${userData.role}!`
            : "Loading user data..."}
        </div>
        <div>User Info Page</div>
      </div>
    </div>
  )
}

export default User
