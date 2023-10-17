import useLocaleContext from "#context/localeContext"
import axios from "axios"
import { useState } from "react"
import styles from "./deleteProduct.module.scss"

const DeleteProduct = ({
  setRefreshAllUsersCounter,
  setrefreshAllProductsCounter,
}) => {
  const [notification, setNotification] = useState("")
  const [productName, setProductName] = useState("")

  const { translate } = useLocaleContext()
  const text = translate.components.crud

  const deleteProduct = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/products/product/`, {
        withCredentials: true,
      })
      setNotification(` productDeleted`)
      setTimeout(() => setNotification(null), 2000)
      setRefreshAllUsersCounter((prevCounter) => prevCounter + 1)
      setrefreshAllProductsCounter((prevCounter) => prevCounter + 1)
      setProductName("")
    } catch (error) {
      setNotification(`productDeleted error `)
      setTimeout(() => setNotification(null), 3000)
      console.error("Can not delete product", error)
    }
  }
  return (
    <div>
      <div className={styles.form}>
        <label className={styles.label} htmlFor='productName'>
          {text.forms.commonProperties.email}
        </label>
        <input
          type='text'
          value={productName}
          required
          onChange={(e) => setProductName(e.target.value)}
        />
        <button
          className={styles.formButton}
          onClick={() => deleteProduct(productName.trim())}
        >
          DELETE
        </button>
      </div>
      <div>{notification}</div>
    </div>
  )
}

export default DeleteProduct
