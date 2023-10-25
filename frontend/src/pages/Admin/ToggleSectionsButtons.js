import styles from "./toggleSectionsButtons.module.scss"
const ToggleSectionButtons = ({
  showProductsSection,
  setShowProductsSection,
  showUsersSection,
  setShowUsersSection,
}) => {
  return (
    <div className={styles.sectionsToggleButtons}>
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
