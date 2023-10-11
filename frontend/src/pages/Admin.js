import NotificationCard from "#components/NotificationCard"
import useLocaleContext from "#context/localeContext"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import NewProductForm from "../components/NewProductForm"
import { titleCase } from "../utils/utils"
import styles from "./admin.module.scss"

const Admin = () => {
  const [adminData, setAdminData] = useState(null)
  const [notification, setNotification] = useState(null)

  const navigate = useNavigate()

  const { translate } = useLocaleContext()

  const text = translate.pages.admin

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/current-user`,
          { withCredentials: true },
        )
        setAdminData(response.data)
      } catch (error) {
        setNotification(`${error.response.data.message}`)
        setTimeout(() => setNotification(null), 2000)
        setTimeout(() => navigate("/login"), 2500)

        console.error("Error fetching admin data", error)
      }
    }

    fetchAdminData()
  }, [])

  const logout = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/users/logout`,
        {},
        {
          withCredentials: true,
        },
      )
      navigate("/login")
    } catch (error) {
      setNotification(`Error to logout: ${error.response.data.message}`)
      console.error(error)
    }
  }

  return (
    <div className={styles.adminPageWrapper}>
      {notification && <NotificationCard message={notification} />}
      <div className={styles.adminPage}>
        <div className={styles.adminFormTitel}>
          {adminData
            ? `${text.welcomeText.firstPart} ${adminData.firstName} ${
                adminData.lastName
              } ${text.welcomeText.secondPart} ${titleCase(
                adminData.role,
                " ",
              )}${text.welcomeText.thirdPart}`
            : `${text.loadingData}`}
        </div>

        <div className={styles.productCrudContainer}>
          <NewProductForm />
        </div>
        <button onClick={() => logout()}>logout</button>
      </div>
    </div>
  )
}

export default Admin
