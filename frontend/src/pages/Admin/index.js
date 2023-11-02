import NotificationCard from "#components/NotificationCard"
import { getAdminData, logout } from "#utils/utils"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ToggleSectionsButtons from "./ToggleSectionsButtons"

import UsersCrud from "#components//UsersCrud"
import ProductsCrud from "#components/ProductsCrud"
import Header from "./Header"
import styles from "./admin.module.scss"

const Admin = () => {
  const [refreshAllUsersCounter, setRefreshAllUsersCounter] = useState(0)
  const [refreshAllProductsCounter, setRefreshAllProductsCounter] = useState(0)
  const [showProductsSection, setShowProductsSection] = useState(false)
  const [showUsersSection, setShowUsersSection] = useState(false)
  const [adminData, setAdminData] = useState({})
  const [notification, setNotification] = useState(null)
  const [emailInUserError, setEmailInUserError] = useState("")
  const [fieldErrors, setFieldErrors] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    const checkData = async () => {
      const data = await getAdminData(setAdminData, setNotification)
      console.log(data)
      if (data && data.role !== "admin") {
        console.log(data.role)
        navigate("/login")
      }
    }
    checkData()
  }, [navigate])

  return (
    <div className={styles.adminPageWrapper}>
      {notification && <NotificationCard message={notification} />}
      <div className={styles.adminPage}>
        <Header data={adminData} logout={logout} />
        <ToggleSectionsButtons
          showProductsSection={showProductsSection}
          setShowProductsSection={setShowProductsSection}
          showUsersSection={showUsersSection}
          setShowUsersSection={setShowUsersSection}
        />
        <ProductsCrud
          showProductsSection={showProductsSection}
          refreshAllProductsCounter={refreshAllProductsCounter}
          setRefreshAllProductsCounter={setRefreshAllProductsCounter}
        />
        <UsersCrud
          showUsersSection={showUsersSection}
          refreshAllUsersCounter={refreshAllUsersCounter}
          setEmailInUserError={setEmailInUserError}
          setFieldErrors={setFieldErrors}
          setRefreshAllUsersCounter={setRefreshAllUsersCounter}
          emailInUserError={emailInUserError}
          fieldErrors={fieldErrors}
        />
      </div>
    </div>
  )
}

export default Admin
