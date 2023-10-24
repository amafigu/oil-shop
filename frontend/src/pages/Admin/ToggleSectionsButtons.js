import useLocaleContext from "#context/localeContext"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./toggleSectionsButtons.module.scss"
const ToggleSectionButtons = ({
  showProductsSection,
  setShowProductsSection,
  showUsersSection,
  setShowUsersSection,
}) => {
  const [notification, setNotification] = useState(null)
  const { translate } = useLocaleContext()

  const text = translate.pages.admin
  const navigate = useNavigate()

  return (
    <div className={styles.sectionsToggleButtons}>
      {" "}
      {showProductsSection ? (
        <button
          className={styles.formButton}
          onClick={() => setShowProductsSection(false)}
        >
          HIDE PRODUCTS ACTIONS
        </button>
      ) : (
        <button
          className={styles.formButton}
          onClick={() => setShowProductsSection(true)}
        >
          SHOW PRODUCTS ACTIONS
        </button>
      )}
      {showUsersSection ? (
        <button
          className={styles.formButton}
          onClick={() => setShowUsersSection(false)}
        >
          HIDE USERS ACTIONS
        </button>
      ) : (
        <button
          className={styles.formButton}
          onClick={() => setShowUsersSection(true)}
        >
          SHOW USERS ACTIONS
        </button>
      )}
    </div>
  )
}

export default ToggleSectionButtons
