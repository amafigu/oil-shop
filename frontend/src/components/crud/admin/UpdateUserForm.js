import NotificationCard from "#components/NotificationCard"
import useLocaleContext from "#context/localeContext"
import axios from "axios"
import { useEffect, useState } from "react"
import styles from "./updateUserForm.module.scss"

const UpdateUserForm = () => {
  const [notification, setNotification] = useState(null)
  const [email, setEmail] = useState("")

  const [userNewData, seUserNewData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  })

  const { translate } = useLocaleContext()
  const text = translate.components.crud

  updateUser = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/users/user/${email}`,
      )
      seUserNewData(response.data)
    } catch (error) {
      console.error("Can not edit user ", error)
    }
  }

  useEffect(() => {
    useGetUserByEmail(email)
  }, [email])

  const listenInputChange = (e) => {
    console.log(userNewData)
    setProductData({ ...userNewData, [e.target.name]: e.target.value })
  }

  return (
    <div>
      {notification && <NotificationCard message={notification} />}
      <label className={styles.label} htmlFor='firstName'>
        {text.commonProperties.firstName}
      </label>
      <input
        className={styles.formField}
        type='text'
        name='useEmail'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <form className={styles.form} onSubmit={submitProductForm}>
        <label className={styles.label} htmlFor='firstName'>
          {text.commonProperties.firstName}
        </label>
        <input
          className={styles.formField}
          type='text'
          name='name'
          onChange={listenInputChange}
          value={userNewData.firstName}
        />

        <label className={styles.label} htmlFor='lastName'>
          {text.commonProperties.lastName}
        </label>
        <input
          onChange={listenInputChange}
          className={styles.formFieldSelect}
          name='email'
        />

        <button className={styles.formButton} type='submit'>
          {text.submitButton}
        </button>
      </form>
    </div>
  )
}

export default UpdateUserForm
