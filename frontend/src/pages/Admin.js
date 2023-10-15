import NotificationCard from "#components/NotificationCard"
import useLocaleContext from "#context/localeContext"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import CreateProductForm from "../components/forms/admin/CreateProductForm"
import { titleCase } from "../utils/utils"
import styles from "./admin.module.scss"

const Admin = () => {
  const [adminData, setAdminData] = useState(null)
  const [notification, setNotification] = useState(null)
  const [userEmail, setUserEmail] = useState("")
  const [userDataByEmail, setUserDataByEmail] = useState({})
  const [availableUsers, setAvailableUsers] = useState([])

  const navigate = useNavigate()

  const { translate } = useLocaleContext()

  const text = translate.pages.admin

  console.log(userDataByEmail)

  useEffect(() => {
    const getAdminData = async () => {
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

        console.error("Error geting admin data", error)
      }
    }

    getAdminData()
  }, [navigate])

  const getUserByEmail = async (email) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/user/${email}`,
        { withCredentials: true },
      )
      // Handle the user data or show a notification
      setUserDataByEmail(response.data)
    } catch (error) {
      setNotification(`Error geting user: ${error.response.data.message}`)
      setTimeout(() => setNotification(null), 2000)
      console.error("Error geting user by email", error)
    }
  }

  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/`,
        { withCredentials: true },
      )
      setAvailableUsers(response.data)
    } catch (error) {
      setNotification("Can not get all users")
    }
  }

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
      setTimeout(() => setNotification(null), 2000)
      console.error(error)
    }
  }

  return (
    <div className={styles.adminPageWrapper}>
      {notification && <NotificationCard message={notification} />}
      <div className={styles.adminPage}>
        <div className={styles.titleAndLogoutButtonContainer}>
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
          <button className={styles.formButton} onClick={() => logout()}>
            {text.logout}
          </button>
        </div>

        <div className={styles.formsContainer}>
          <div className={styles.adminCrudContainer}>
            {text.crud.products.create}
            <CreateProductForm />
          </div>
          <div className={styles.adminCrudContainer}>
            {text.crud.products.edit}
          </div>
          <div className={styles.adminCrudContainer}>
            {text.crud.products.delete}
          </div>
          <div className={styles.adminCrudContainer}>
            {text.crud.users.getByEmail}
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
              {text.crud.users.getUserButton}
            </button>

            <div>
              {text.userInfo.firstName}: {userDataByEmail.firstName}
            </div>
            <div>
              {text.userInfo.lastName}: {userDataByEmail.lastName}
            </div>
            <div>
              {text.userInfo.role}: {userDataByEmail.role}
            </div>
          </div>
          <button className={styles.formButton} onClick={() => getAllUsers()}>
            ALL USERS
          </button>
          <button
            className={styles.formButton}
            onClick={() => setAvailableUsers([])}
          >
            HIDE USERS
          </button>
          <div className={styles.availableUsersContainer}>
            {availableUsers &&
              availableUsers.map((availableUser) => (
                <div className={styles.avaliableUserData} key={availableUser}>
                  <div>
                    {text.userInfo.firstName}: {availableUser.firstName}
                  </div>
                  <div>
                    {text.userInfo.lastName}: {availableUser.lastName}
                  </div>
                  <div>
                    {text.userInfo.email}: {availableUser.email}
                  </div>
                </div>
              ))}
          </div>

          <div className={styles.adminCrudContainer}></div>
        </div>
        <div className={styles.formsContainer}>
          <div className={styles.adminCrudContainer}>
            {text.crud.users.create}
            <CreateProductForm />
          </div>
          <div className={styles.adminCrudContainer}>
            {text.crud.users.edit}
            <CreateProductForm />
          </div>
          <div className={styles.adminCrudContainer}>
            {text.crud.users.delete}
            <CreateProductForm />
          </div>
          <div className={styles.adminCrudContainer}>
            {text.crud.users.getByEmail}
            <CreateProductForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
