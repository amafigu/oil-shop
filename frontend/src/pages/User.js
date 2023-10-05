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
        const userEmail = response.data.email
        setUserData(userEmail)
        console.log("user fetchUserData ", response.data)
        console.log("user userEmail ", response.data)
      } catch (error) {
        console.log("error User")
        console.log("error User", error)
        console.error("Error fetching user data", error)
      }
    }

    fetchUserData()
  }, [])

  return (
    <div className=''>
      <div className=''>
        <div className={style.pageTitle}>
          {/* Render user data */}
          {userData ? `Hello, ${userData}!` : "Loading user data..."}
        </div>
        <div>User Info Page</div>
      </div>
    </div>
  )
}

export default User
