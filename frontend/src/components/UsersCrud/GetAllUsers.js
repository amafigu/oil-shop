import NotificationCard from "#components/NotificationCard"
import ToggleButton from "#components/ToggleButton"
import axios from "axios"
import { useEffect, useState } from "react"
import EditableListUserData from "./EditableListUserData"
import styles from "./getAllUsers.module.scss"

const GetAllUsers = ({ refreshAllUsersCounter }) => {
  const [notification, setNotification] = useState()
  const [showUsers, setShowUsers] = useState(false)
  const [usersData, setUsersData] = useState([])

  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/`,
        { withCredentials: true },
      )

      const userObjects = response.data.map((user) => ({
        ...user,
        updated: false,
      }))
      console.log(response.data)
      setUsersData(userObjects)
      console.log(response.data)
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
        <div className={showUsers ? `${styles.show}` : `${styles.hide}`}>
          {usersData &&
            usersData.map((user) => (
              <div className={styles.itemRow} key={user.id}>
                <div className={styles.editableInputsContainer}>
                  <div className={styles.atributesContainer}>
                    <EditableListUserData user={user} key={user.id} />
                  </div>
                </div>
              </div>
            ))}
        </div>
      }
    </div>
  )
}

export default GetAllUsers
