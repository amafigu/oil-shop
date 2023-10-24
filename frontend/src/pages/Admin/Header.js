import NotificationCard from "#components/NotificationCard"
import useLocaleContext from "#context/localeContext"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./header.module.scss"
const Header = ({ data, logout }) => {
  const [notification, setNotification] = useState(null)
  const { translate } = useLocaleContext()

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
              {`${text.welcomeText.firstPart} ${data.firstName} ${data.lastName} ${text.welcomeText.secondPart}
                 ${data.role} 
                 ${text.welcomeText.thirdPart}`}
            </span>
          </div>
        ) : (
          `${text.loadingData}`
        )}
      </div>
      <button
        className={styles.formButton}
        onClick={() => logout(navigate, setNotification)}
      >
        {text.logout}
      </button>
    </div>
  )
}

export default Header
