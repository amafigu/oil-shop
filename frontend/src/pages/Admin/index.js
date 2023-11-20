import UsersCrud from "#components//UsersCrud"
import NotificationCard from "#components/NotificationCard"
import ProductsCrud from "#components/ProductsCrud"
import { getAdminData } from "#utils/utils"
import { useEffect, useState } from "react"
import Header from "./Header"
import styles from "./admin.module.scss"

const Admin = () => {
  const [refreshAllUsersCounter, setRefreshAllUsersCounter] = useState(0)
  const [refreshAllProductsCounter, setRefreshAllProductsCounter] = useState(0)
  const [adminData, setAdminData] = useState({})
  const [notification, setNotification] = useState(null)
  const [emailInUserError, setEmailInUserError] = useState("")
  const [fieldErrors, setFieldErrors] = useState({})

  useEffect(() => {
    const checkData = async () => {
      await getAdminData(setAdminData, setNotification)
    }
    checkData()
  }, [])

  return (
    <div className={styles.adminPageWrapper}>
      {notification && <NotificationCard message={notification} />}
      <div className={styles.adminPage}>
        <Header data={adminData} />
        <div className={styles.componentContainer}>
          <ProductsCrud
            refreshAllProductsCounter={refreshAllProductsCounter}
            setRefreshAllProductsCounter={setRefreshAllProductsCounter}
          />
        </div>

        <div className={styles.componentContainer}>
          <UsersCrud
            refreshAllUsersCounter={refreshAllUsersCounter}
            setEmailInUserError={setEmailInUserError}
            setFieldErrors={setFieldErrors}
            setRefreshAllUsersCounter={setRefreshAllUsersCounter}
            emailInUserError={emailInUserError}
            fieldErrors={fieldErrors}
          />
        </div>
      </div>
    </div>
  )
}

export default Admin
