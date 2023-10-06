import axios from "axios"
import React, { useEffect, useState } from "react"
import style from "./user.module.scss"

const User = () => {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/current-user`,
          { withCredentials: true },
        )
        setUserData(response.data)
      } catch (error) {
        console.error("Error fetching user data", error)
      }
    }

    fetchUserData()
  }, [])

  return (
    <div className=''>
      <div className=''>
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
