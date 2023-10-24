import NotificationCard from "#components/NotificationCard"
import useLocaleContext from "#context/localeContext"
import axios from "axios"
import { useEffect, useState } from "react"
import styles from "./getAllUsers.module.scss"

const GetAllUsers = ({ refreshAllUsersCounter }) => {
  const [notification, setNotification] = useState()
  const [availableUsers, setAvailableUsers] = useState([])
  const [showUsers, setShowUsers] = useState(false)

  const { translate } = useLocaleContext()
  const text = translate.components.crud

  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/`,
        { withCredentials: true },
      )
      setAvailableUsers(response.data)
    } catch (error) {
      setNotification("Can not get all users")
    }
  }

  useEffect(() => {
    getAllUsers()
  }, [refreshAllUsersCounter])

  const showUserListAndGetData = () => {
    getAllUsers()
    setShowUsers(true)
  }

  return (
    <div className={styles.getAllUsersWrapper}>
      {notification && <NotificationCard message={notification} />}

      <div className={styles.showHideButtonsContainer}>
        {showUsers ? (
          <button
            className={styles.showHideButtons}
            onClick={() => setShowUsers(false)}
          >
            HIDE ALL USERS
          </button>
        ) : (
          <button
            className={styles.showHideButtons}
            onClick={() => showUserListAndGetData()}
          >
            GET ALL USERS
          </button>
        )}
      </div>
      {
        <div
          className={
            showUsers
              ? `${styles.availableUsersContainer} ${styles.show}`
              : `${styles.hide}`
          }
        >
          {availableUsers &&
            availableUsers.map((availableUser) => (
              <div className={styles.availableUser} key={availableUser.email}>
                <img
                  src={availableUser.image}
                  alt={availableUser.name}
                  className={styles.itemImage}
                />
                <div className={styles.availableUserData}>
                  <div className={styles.item}>
                    {text.forms.commonProperties.firstName}:{" "}
                    {availableUser.firstName}
                  </div>
                  <div className={styles.item}>
                    {text.forms.commonProperties.lastName}:{" "}
                    {availableUser.lastName}
                  </div>
                  <div className={styles.item}>
                    {text.forms.commonProperties.email}: {availableUser.email}
                  </div>
                  <div className={styles.item}>
                    {text.forms.commonProperties.role}: {availableUser.role}
                  </div>
                </div>
                <div className={styles.actionButtons}>
                  <button
                    className={styles.showHideButtons}
                    onClick={() => console.log("edit user")}
                  >
                    EDIT
                  </button>

                  <button
                    className={styles.showHideButtons}
                    onClick={() => console.log("delete user")}
                  >
                    DELETE
                  </button>
                  <button
                    className={styles.showHideButtons}
                    onClick={() => setShowUsers(false)}
                  >
                    {text.getAllProducts.hideButton}
                  </button>
                </div>
              </div>
            ))}
        </div>
      }
    </div>
  )
}

export default GetAllUsers
