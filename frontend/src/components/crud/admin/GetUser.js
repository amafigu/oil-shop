import NotificationCard from "#components/NotificationCard"
import useLocaleContext from "#context/localeContext"
import { getUserByEmail } from "#utils/utils"
import { useState } from "react"
import styles from "./getUser.module.scss"

const GetUser = () => {
  const [userEmail, setUserEmail] = useState("")
  const [userDataByEmail, setUserDataByEmail] = useState({})
  const [notification, setNotification] = useState(null)

  const { translate } = useLocaleContext()
  const text = translate.components.crud

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
        onClick={() =>
          getUserByEmail(userEmail.trim(), setUserDataByEmail, setNotification)
        }
      >
        {text.getUser.getByEmail}
      </button>

      <div>
        {text.forms.commonProperties.firstName}:{" "}
        {userDataByEmail ? userDataByEmail.firstName : ""}
      </div>
      <div>
        {text.forms.commonProperties.lastName}:
        {userDataByEmail ? userDataByEmail.lastName : ""}
      </div>
      <div>
        {text.forms.commonProperties.role}:
        {userDataByEmail ? userDataByEmail.role : ""}
      </div>
      <div>
        {text.forms.commonProperties.createdAt}:
        {userDataByEmail ? userDataByEmail.createdAt : ""}
      </div>
    </div>
  )
}

export default GetUser
