import NotificationCard from "#components/NotificationCard"
import { getAdminData } from "#utils/utils"
import { useEffect, useState } from "react"
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

  useEffect(() => {
    const checkData = async () => {
      const data = await getAdminData(setAdminData, setNotification)
      console.log("Admin - checkData() - data ", data)
    }
    checkData()
  }, [])

  console.log("Admin - adminData ", adminData)

  return (
    <div className={styles.adminPageWrapper}>
      {notification && <NotificationCard message={notification} />}
      <div className={styles.adminPage}>
        <Header data={adminData} />
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
