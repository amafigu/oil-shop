import NotificationCard from "#components/NotificationCard"
import useLocaleContext from "#context/localeContext"
import axios from "axios"
import { useState } from "react"
import styles from "./getUser.module.scss"

const GetUser = () => {
  const [userEmail, setUserEmail] = useState("")
  const [userDataByEmail, setUserDataByEmail] = useState({})
  const [notification, setNotification] = useState(null)

  const { translate } = useLocaleContext()
  const text = translate.components.crud

  const getUserByEmail = async (email) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/user/${email}`,
        { withCredentials: true },
      )
      setUserDataByEmail(response.data)
      console.log("data ", response.data)
      setUserEmail("")
    } catch (error) {
      setNotification(`Error geting user: ${error.response.data.message}`)
      setTimeout(() => setNotification(null), 2000)
      console.error("Error geting user by email", error)
    }
  }

  return (
    <div>
      {notification && <NotificationCard message={notification} />}
      <input
        type='text'
        value={userEmail}
        required
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <button
        className={styles.formButton}
        onClick={() => getUserByEmail(userEmail.trim())}
      >
        {text.getUser.getByEmail}
      </button>

      <div>
        {text.forms.commonProperties.firstName}: {userDataByEmail.firstName}
      </div>
      <div>
        {text.forms.commonProperties.lastName}: {userDataByEmail.lastName}
      </div>
      <div>
        {text.forms.commonProperties.role}: {userDataByEmail.role}
      </div>
      <div>
        {text.forms.commonProperties.createdAt}: {userDataByEmail.createdAt}
      </div>
    </div>
  )
}

export default GetUser
