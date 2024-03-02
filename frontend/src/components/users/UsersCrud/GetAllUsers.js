import { getAllUsersList } from "#api/users/getAllUsersList"
import NotificationCard from "#components/ui/NotificationCard"
import { ToggleButton } from "#components/ui/ToggleButton"
import { STYLES } from "#constants/styles"
import { SHORT_MESSAGE_TIMEOUT } from "#constants/time"
import { useTranslation } from "#hooks/useTranslation"
import { useCallback, useEffect, useState } from "react"
import EditableListUserData from "./EditableListUserData"
import styles from "./getAllUsers.module.scss"

const GetAllUsers = ({ refreshAllUsersCounter, setRefreshAllUsersCounter }) => {
  const [notification, setNotification] = useState()
  const [showUsers, setShowUsers] = useState(false)
  const [usersData, setUsersData] = useState([])
  const { translate } = useTranslation()
  const text = translate.components.crud.getAllUsers

  const getUsersList = useCallback(async () => {
    try {
      const listResponse = await getAllUsersList()
      if (listResponse) {
        setUsersData(listResponse)
      }
    } catch (error) {
      setNotification(text.error)
      setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
    }
  }, [text.error, setUsersData, setNotification])

  useEffect(() => {
    getUsersList()
  }, [refreshAllUsersCounter, getUsersList])

  const showUserListAndGetData = (bool) => {
    setShowUsers(bool)
  }

  return (
    <div className={styles.getAllUsersWrapper}>
      {notification && <NotificationCard message={notification} />}

      <div className={styles.showHideButtonsContainer}>
        <ToggleButton
          isVisible={showUsers}
          onToggle={showUserListAndGetData}
          hideBtnText={text.hideButton.toUpperCase()}
          showBtnText={text.showButton.toUpperCase()}
          classCss={STYLES.BUTTONS.SHOW_HIDE}
        />
      </div>

      {
        <div className={showUsers ? `${styles.show}` : `${styles.hide}`}>
          {usersData &&
            usersData.map((user) => (
              <div className={styles.itemRow} key={user.id}>
                <div className={styles.editableInputsContainer}>
                  <div className={styles.atributesContainer}>
                    <EditableListUserData
                      user={user}
                      setRefreshAllUsersCounter={setRefreshAllUsersCounter}
                    />
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
