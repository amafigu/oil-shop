import NotificationCard from "#components/NotificationCard"
import useLocaleContext from "#context/localeContext"
import axios from "axios"
import { useState } from "react"
import styles from "./getAllUsers.module.scss"

const GetAllUsers = () => {
  const [notification, setNotification] = useState()
  const [availableUsers, setAvailableUsers] = useState([])

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
  return (
    <div>
      {notification && <NotificationCard message={notification} />}
      <div className={styles.form}>
        <button className={styles.formButton} onClick={() => getAllUsers()}>
          {text.getAllUsers.showButton}
        </button>
        <button
          className={styles.formButton}
          onClick={() => setAvailableUsers([])}
        >
          {text.getAllUsers.hideButton}
        </button>
        <div className={styles.availableUsersContainer}>
          {availableUsers &&
            availableUsers.map((availableUser) => (
              <div
                className={styles.avaliableUserData}
                key={availableUser.email}
              >
                <div>
                  {text.forms.commonProperties.firstName}:{" "}
                  {availableUser.firstName}
                </div>
                <div>
                  {text.forms.commonProperties.lastName}:{" "}
                  {availableUser.lastName}
                </div>
                <div>
                  {text.forms.commonProperties.email}: {availableUser.email}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default GetAllUsers
