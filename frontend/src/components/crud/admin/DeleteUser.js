import useLocaleContext from "#context/localeContext"
import axios from "axios"
import { useState } from "react"
import styles from "./deleteUser.module.scss"

const DeleteUser = ({ setRefreshAllUsersCounter }) => {
  const [notification, setNotification] = useState("")
  const [userEmail, setUserEmail] = useState("")

  const { translate } = useLocaleContext()
  const text = translate.components.crud

  const deleteUser = async () => {
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
      setUserEmail("")
    } catch (error) {
      setNotification(`${userEmail} ${text.deleteUser.error}`)
      setTimeout(() => setNotification(null), 3000)
      console.error("Can not delete user", error)
    }
  }
  return (
    <div>
      <div className={styles.form}>
        <label className={styles.label} htmlFor='userEmail'>
          {text.forms.commonProperties.email}
        </label>
        <input
          type='text'
          value={userEmail}
          required
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <button
          className={styles.formButton}
          onClick={() => deleteUser(userEmail.trim())}
        >
          {text.deleteUser.button}
        </button>
      </div>
      <div>{notification}</div>
    </div>
  )
}

export default DeleteUser
