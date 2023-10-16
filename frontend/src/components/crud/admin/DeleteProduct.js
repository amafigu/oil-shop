import useLocaleContext from "#context/localeContext"
import axios from "axios"
import { useState } from "react"
import styles from "./deleteProduct.module.scss"

const DeleteProduct = ({ setRefreshAllUsersCounter }) => {
  const [notification, setNotification] = useState("")
  const [userEmail, setUserEmail] = useState("")

  const { translate } = useLocaleContext()
  const text = translate.components.crud

  const deleteProduct = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/products/product/`, {
        withCredentials: true,
      })
      setNotification(`${userEmail} ${text.deleteProduct.deletedByEmail}`)
      setTimeout(() => setNotification(null), 2000)
      setRefreshAllUsersCounter((prevCounter) => prevCounter + 1)
      setUserEmail("")
    } catch (error) {
      setNotification(`${userEmail} ${text.deleteProduct.error}`)
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
          onClick={() => deleteProduct(userEmail.trim())}
        ></button>
      </div>
      <div>{notification}</div>
    </div>
  )
}

export default DeleteProduct
