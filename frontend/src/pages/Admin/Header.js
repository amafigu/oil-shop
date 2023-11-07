import NotificationCard from "#components/NotificationCard"
import useLocaleContext from "#context/localeContext"
import useUserContext from "#context/userContext"
import { logout } from "#utils/utils"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import styles from "./header.module.scss"
const Header = ({ data }) => {
  const [notification, setNotification] = useState(null)
  const { translate } = useLocaleContext()

  const { setUserEmail, setIsLoggedIn, setUser } = useUserContext()
  const text = translate.pages.admin
  const navigate = useNavigate()

  return (
    <div className={styles.titleAndLogoutButtonContainer}>
      {notification && <NotificationCard message={notification} />}

      <div className={styles.adminFormTitel}>
        {data ? (
          <div>
            <img src={data.image} alt='user' />
            <span>
              {`${text.welcomeText.firstPart} ${data.firstName} ${data.lastName} ${text.welcomeText.secondPart}`}
            </span>
          </div>
        ) : (
          `${text.loadingData}`
        )}
      </div>
      <button
        className={styles.formButton}
        onClick={() =>
          logout(
            navigate,
            setNotification,
            setIsLoggedIn,
            setUserEmail,
            setUser,
          )
        }
      >
        {text.logout}
      </button>
    </div>
  )
}

export default Header
