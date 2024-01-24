import Header from "#components/Header"
import NotificationCard from "#components/NotificationCard"
import ProductsCrud from "#components/ProductsCrud"
import UsersCrud from "#components/UsersCrud"
import useUserContext from "#context/userContext"
import {
  REDIRECT_TIMEOUT,
  ROUTES_LOGIN,
  SHORT_MESSAGE_TIMEOUT,
} from "#utils/constants"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ROUTES_CURRENT_CUSTOMER } from "../../utils/constants"
import styles from "./admin.module.scss"
const Admin = () => {
  const [refreshAllProductsCounter, setRefreshAllProductsCounter] = useState(0)
  const [notification, setNotification] = useState(null)
  const [emailInUserError, setEmailInUserError] = useState("")
  const [fieldErrors, setFieldErrors] = useState({})
  const [headerData, setHeaderData] = useState({})
  const { user, isLoading } = useUserContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading) {
      if (user && Object.keys(user).length !== 0) {
        setHeaderData({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          image: user.image,
        })
        if (user.role === "customer") {
          navigate(ROUTES_CURRENT_CUSTOMER)
        }
      } else if (!user) {
        setNotification("User not logged in")
        setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
        setTimeout(() => navigate(ROUTES_LOGIN), REDIRECT_TIMEOUT)
      }
    }
  }, [isLoading, user, navigate])

  return (
    <div className={styles.adminPageWrapper}>
      {notification && <NotificationCard message={notification} />}
      <div className={styles.adminPage}>
        <Header data={headerData} />
        <div className={styles.componentContainer}>
          <ProductsCrud
            refreshAllProductsCounter={refreshAllProductsCounter}
            setRefreshAllProductsCounter={setRefreshAllProductsCounter}
          />
        </div>

        <div className={styles.componentContainer}>
          <UsersCrud
            setEmailInUserError={setEmailInUserError}
            setFieldErrors={setFieldErrors}
            emailInUserError={emailInUserError}
            fieldErrors={fieldErrors}
          />
        </div>
      </div>
    </div>
  )
}

export default Admin
