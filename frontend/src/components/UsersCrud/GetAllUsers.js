import NotificationCard from "#components/NotificationCard"
import ToggleButton from "#components/ToggleButton"
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

  const showUserListAndGetData = (bool) => {
    setShowUsers(bool)
  }

  return (
    <div className={styles.getAllUsersWrapper}>
      {notification && <NotificationCard message={notification} />}

      <div className={styles.showHideButtonsContainer}>
        <ToggleButton
          show={showUsers}
          setToggle={showUserListAndGetData}
          textHide='HIDE ALL USERS'
          textShow='GET ALL USERS'
          classCss='showHideButtons'
        />
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
                    {text.forms.commonProperties.role}: {availableUser.roleId}
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
