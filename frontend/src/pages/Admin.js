import axios from "axios"
import React, { useEffect, useState } from "react"
import style from "./admin.module.scss"

const Admin = () => {
  const [adminData, setAdminData] = useState(null)

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/current-user`,
          { withCredentials: true },
        )
        setAdminData(response.data)
      } catch (error) {
        console.error("Error fetching admin data", error)
      }
    }

    fetchAdminData()
  }, [])

  return (
    <div className=''>
      <div className=''>
        <div className={style.pageTitle}>
          {adminData
            ? `Hello, ${adminData.firstName} ${adminData.lastName} you are loggin as a ${adminData.role}!`
            : "Loading admin data..."}
        </div>
        <div>Admin Info Page</div>
      </div>
    </div>
  )
}

export default Admin
