import axios from "axios"
import React, { useEffect, useState } from "react"
import style from "./user.module.scss"

const User = () => {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token")

        // from here I would like to get (extract) the user mail encrypted in the token that I got from the backend
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/current-user/amo@mail.com`,
          config,
        )
        setUserData(response.data)
        console.log("user fetchUserData ", response.data)
        console.log("user config ", config)
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
          {userData ? `Hello, ${userData.firstName}!` : "Loading user data..."}
        </div>
        <div>User Info Page</div>
      </div>
    </div>
  )
}

export default User
