import EditableInput from "#components/EditableInput"
import NotificationCard from "#components/NotificationCard"
import ToggleButton from "#components/ToggleButton"
import useLocaleContext from "#context/localeContext"
import { STYLES } from "#utils/constants"
import axios from "axios"
import { useEffect, useState } from "react"
import styles from "./getAllUsers.module.scss"

const GetAllUsers = ({ refreshAllUsersCounter }) => {
  const [notification, setNotification] = useState()
  const [availableUsers, setAvailableUsers] = useState([])
  const [showUsers, setShowUsers] = useState(false)
  const [usersData, setUsersData] = useState([])
  const initialUserData = {
    firstName: "",
    lastName: "",
    email: "",
    image: "",
  }
  const { translate } = useLocaleContext()
  const text = translate.components.crud

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

  const deleteUser = async (userEmail, setRefreshAllUsersCounter) => {
    console.log(userEmail)
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/users/user/${userEmail}`,
        {
          withCredentials: true,
        },
      )
      setNotification(`${userEmail} ${text.deleteUser.deletedByEmail}`)
      setTimeout(() => setNotification(null), 2000)
      setRefreshAllUsersCounter((prevCounter) => prevCounter + 1)
    } catch (error) {
      setNotification(`${userEmail} ${text.deleteUser.error}`)
      setTimeout(() => setNotification(null), 3000)
      console.error("Can not delete user", error)
    }
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
            usersData.map((user, index) => (
              <div className={styles.itemRow}>
                <div className={styles.imageContainer}>
                  <img className={styles.image} src={user.image} alt='user' />
                </div>
                <div className={styles.editableInputsContainer}>
                  {Object.keys(initialUserData).map((key) => (
                    <div className={styles.atributesContainer} key={key}>
                      <div className={styles.inputContainer} key={key}>
                        <EditableInput
                          label={key}
                          name={key}
                          value={user[key]}
                          onChange={(e) => {
                            const updatedUser = {
                              ...user,
                              [key]: e.target.value,
                              updated: true,
                            }
                            setUsersData(
                              usersData.map((u, i) =>
                                i === index ? updatedUser : u,
                              ),
                            )
                          }}
                          classCss={STYLES.FORMS.FIELD}
                          originalPropertyData={user}
                          updatedPropertyData={user}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      }
    </div>
  )
}

export default GetAllUsers
