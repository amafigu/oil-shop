import NotificationCard from "#components/NotificationCard"
import useLocaleContext from "#context/localeContext"
import axios from "axios"
import { useEffect, useState } from "react"
import styles from "./getAllUsers.module.scss"

const GetAllProducts = ({ refreshAllUsersCounter }) => {
  const [notification, setNotification] = useState()
  const [avaliableProducts, setAvaliableProducts] = useState([])
  const [showProducts, setShowProducts] = useState(false)

  const { translate } = useLocaleContext()
  const text = translate.components.crud

  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/`,
        { withCredentials: true },
      )
      setAvaliableProducts(response.data)
    } catch (error) {
      setNotification("Can not get all users")
    }
  }

  useEffect(() => {
    getAllUsers()
  }, [refreshAllUsersCounter])

  const hideUserList = () => {
    setShowProducts(false)
  }

  const showUserListAndGetData = () => {
    getAllUsers()
    setShowProducts(true)
  }

  return (
    <div className={styles.getAllUsersWrapper}>
      {notification && <NotificationCard message={notification} />}
      <div className={styles.form}>
        <button
          className={styles.formButton}
          onClick={() => showUserListAndGetData()}
        >
          {text.getAllUsers.showButton}
        </button>
        <button className={styles.formButton} onClick={() => hideUserList()}>
          {text.getAllUsers.hideButton}
        </button>
        {
          <div
            className={
              showProducts
                ? `${styles.avaliableProductsContainer} ${styles.show}`
                : `${styles.hide}`
            }
          >
            {avaliableProducts &&
              avaliableProducts.map((availableUser) => (
                <div
                  className={styles.avaliableUserData}
                  key={availableUser.email}
                >
                  <div>
                    {text.forms.commonProperties.firstName}:{" "}
                    {availableUser.firstName}
                  </div>
                  <div>
                    {text.forms.commonProperties.lastName}:{" "}
                    {availableUser.lastName}
                  </div>
                  <div>
                    {text.forms.commonProperties.email}: {availableUser.email}
                  </div>
                  <div>
                    {text.forms.commonProperties.role}: {availableUser.role}
                  </div>
                </div>
              ))}
          </div>
        }
      </div>
    </div>
  )
}

export default GetAllProducts
