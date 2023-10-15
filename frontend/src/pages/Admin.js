import NotificationCard from "#components/NotificationCard"
import ZodValidationErrorsCard from "#components/ZodValidationErrorsCard"
import CreateProductForm from "#components/crud/admin/CreateProductForm"
import DeleteUser from "#components/crud/admin/DeleteUser"
import GetAllUsers from "#components/crud/admin/GetAllUsers"
import GetUser from "#components/crud/admin/GetUser"
import useLocaleContext from "#context/localeContext"
import { getAdminData, logout, titleCase } from "#utils/utils"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import CreateUserForm from "./SignUp/CreateUserForm"

import UpdateUserForm from "../components/crud/admin/UpdateUserForm"
import styles from "./admin.module.scss"

const Admin = () => {
  const [refreshAllUsersCounter, setRefreshAllUsersCounter] = useState(0)

  const [adminData, setAdminData] = useState(null)
  const [notification, setNotification] = useState(null)
  const [emailInUserError, setEmailInUserError] = useState("")
  const [fieldErrors, setFieldErrors] = useState({})

  const navigate = useNavigate()
  const { translate } = useLocaleContext()
  const text = translate.pages.admin
  const errorText = translate.pages.signUp

  useEffect(() => {
    getAdminData(setAdminData, setNotification, navigate)
  }, [navigate])

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
          <button
            className={styles.formButton}
            onClick={() => logout(navigate, setNotification)}
          >
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
            <GetAllUsers refreshAllUsersCounter={refreshAllUsersCounter} />
            <div className={styles.adminCrudContainer}>
              {text.crud.users.create}
              <CreateUserForm
                setEmailInUserError={setEmailInUserError}
                setFieldErrors={setFieldErrors}
                setRefreshAllUsersCounter={setRefreshAllUsersCounter}
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
              <UpdateUserForm />
            </div>
            <div className={styles.adminCrudContainer}>
              {text.crud.users.delete}
              <DeleteUser
                setRefreshAllUsersCounter={setRefreshAllUsersCounter}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
