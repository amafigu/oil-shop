import NotificationCard from "#components/ui/NotificationCard"
import { ToggleButton } from "#components/ui/ToggleButton"
import { UserHeader } from "#components/ui/UserHeader"
import UsersCrud from "#components/users/UsersCrud"
import { ROUTES_CURRENT_CUSTOMER, ROUTES_LOGIN } from "#constants/routes"
import { REDIRECT_TIMEOUT, SHORT_MESSAGE_TIMEOUT } from "#constants/time"
import useUserContext from "#context/userContext"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AdminProductsList } from "./AdminProductsList"
import { CreateProduct } from "./CreateProduct"
import styles from "./admin.module.scss"

export const Admin = () => {
  const [showProductsSection, setShowProductsSection] = useState(false)
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
    <main className={styles.adminPageWrapper}>
      {notification && <NotificationCard message={notification} />}
      <section className={styles.adminPage}>
        <UserHeader data={headerData} />
        <div className={styles.componentContainer}>
          <div className={styles.productsCrudWrapper}>
            <ToggleButton
              isVisible={showProductsSection}
              onToggle={setShowProductsSection}
              hideBtnText={"HIDE PRODUCTS ACTIONS"}
              showBtnText={"SHOW PRODUCTS ACTIONS"}
              classCss='showHideButtons'
            />
            {showProductsSection && (
              <div className={styles.formsContainerWrapper}>
                <div className={styles.formsContainer}>
                  <div className={styles.crudContainer}>
                    <AdminProductsList />
                  </div>

                  <div className={styles.crudContainer}>
                    <CreateProduct />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.componentContainer}>
          <UsersCrud
            setEmailInUserError={setEmailInUserError}
            setFieldErrors={setFieldErrors}
            emailInUserError={emailInUserError}
            fieldErrors={fieldErrors}
          />
        </div>
      </section>
    </main>
  )
}
