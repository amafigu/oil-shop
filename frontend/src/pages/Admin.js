import NotificationCard from "#components/NotificationCard"
import ZodValidationErrorsCard from "#components/ZodValidationErrorsCard"
import CreateProductForm from "#components/crud/admin/CreateProductForm"
import DeleteUser from "#components/crud/admin/DeleteUser"
import GetAllUsers from "#components/crud/admin/GetAllUsers"
import GetUser from "#components/crud/admin/GetUser"
import useLocaleContext from "#context/localeContext"
import { titleCase } from "#utils/utils"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import CreateUserForm from "./SignUp/CreateUserForm"

import styles from "./admin.module.scss"

const Admin = () => {
  const [adminData, setAdminData] = useState(null)
  const [notification, setNotification] = useState(null)
  const [emailInUserError, setEmailInUserError] = useState("")
  const [fieldErrors, setFieldErrors] = useState({})

  const navigate = useNavigate()
  const { translate } = useLocaleContext()
  const text = translate.pages.admin
  const errorText = translate.pages.signUp

  console.log("admin page emailInUserError ", emailInUserError)

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
        <div className={styles.productsCrudContainer}>
          PRODUCTS
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

            <div className={styles.adminCrudContainer}></div>
          </div>
        </div>
        <div className={styles.usersCrudContainer}>
          USERS
          <div className={styles.formsContainer}>
            <div className={styles.adminCrudContainer}>
              {text.crud.users.getByEmail}
              <GetUser />
            </div>
            <div className={styles.adminCrudContainer}></div>
            <GetAllUsers />
            <div className={styles.adminCrudContainer}>
              {text.crud.users.create}
              <CreateUserForm
                setEmailInUserError={setEmailInUserError}
                setFieldErrors={setFieldErrors}
              />
              {emailInUserError && (
                <div className={styles.errorMessage}>{emailInUserError}</div>
              )}
              {fieldErrors && (
                <ZodValidationErrorsCard
                  fieldErrors={fieldErrors}
                  text={errorText}
                />
              )}
            </div>
            <div className={styles.adminCrudContainer}>
              {text.crud.users.edit}
            </div>
            <div className={styles.adminCrudContainer}>
              {text.crud.users.delete}
              <DeleteUser />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
