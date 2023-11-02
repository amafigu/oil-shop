import NotificationCard from "#components/NotificationCard"
import useLocaleContext from "#context/localeContext"

import { getUserByEmail } from "#utils/utils"
import axios from "axios"
import { useState } from "react"
import styles from "./updateUserForm.module.scss"

const UpdateUserForm = () => {
  const [notification, setNotification] = useState(null)
  const [email, setEmail] = useState("")

  const [userOldData, setUserOldData] = useState({
    email: "",
    lastName: "",
    firstName: "",
  })

  const [userNewData, setUserNewData] = useState({
    email: "",
    lastName: "",
    firstName: "",
  })

  const { translate } = useLocaleContext()
  const text = translate.components.crud

  const updateUser = async (e) => {
    e.preventDefault()
    if (JSON.stringify(userOldData) === JSON.stringify(userNewData)) {
      setNotification("No changes made.")
      setTimeout(() => setNotification(null), 1300)
      return
    }
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/users/user/${email}`,
        userNewData,
        { withCredentials: true },
      )
      setUserOldData(response.data)
      setNotification("setUser")
      setTimeout(() => setNotification(null), 1300)
    } catch (error) {
      console.error("Can not edit user ", error)
    }
  }

  const listenInputChange = (e) => {
    setUserNewData({ ...userOldData, [e.target.name]: e.target.value })
  }

  return (
    <div>
      {notification && <NotificationCard message={notification} />}

      <label className={styles.label} htmlFor='userEmail'>
        User Email
      </label>
      <input
        className={styles.formField}
        type='text'
        name='userEmail'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder={email}
      />
      <button
        className={styles.formButton}
        onClick={() => getUserByEmail(email, setUserOldData, setNotification)}
      >
        Set User
      </button>
      <div>
        <div>{userOldData.email}</div>
        <div>{userOldData.firstName}</div>
        <div>{userOldData.lastName}</div>
      </div>

      <form className={styles.form} onSubmit={(e) => updateUser(e)}>
        <label className={styles.label} htmlFor='email'></label>
        <input
          className={styles.formField}
          type='text'
          name='email'
          onChange={(e) => listenInputChange(e)}
          value={userNewData.email}
          placeholder={"email"}
        />
        <label className={styles.label} htmlFor='firstName'></label>
        <input
          className={styles.formField}
          type='text'
          name='firstName'
          onChange={(e) => listenInputChange(e)}
          value={userNewData.firstName}
          placeholder={"firstName"}
        />

        <label className={styles.label} htmlFor='lastName'></label>
        <input
          onChange={(e) => listenInputChange(e)}
          className={styles.formFieldSelect}
          name='lastName'
          value={userNewData.lastName}
          placeholder={"lastName"}
        />

        <button className={styles.formButton} type='submit'>
          {text.submitButton}
        </button>
      </form>
    </div>
  )
}

export default UpdateUserForm
