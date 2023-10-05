import axios from "axios"
import React, { useEffect, useState } from "react"
import style from "./admin.module.scss"

const Admin = () => {
  const [adminData, setadminData] = useState(null)

  useEffect(() => {
    const fetchadminData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/current-user`,
          { withCredentials: true },
        )
        setadminData(response.data)
      } catch (error) {
        console.log("error admin ")
        console.error("Error fetching admin data", error)
      }
    }

    fetchadminData()
  }, [])

  return (
    <div className=''>
      <div className=''>
        <div className={style.pageTitle}>
          {/* Render admin data */}
          {adminData
            ? `Hello, ${adminData.firstName}!`
            : "Loading admin data..."}
        </div>
        <div>admin Info Page</div>
      </div>
    </div>
  )
}

export default Admin
