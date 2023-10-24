import ZodValidationErrorsCard from "#components/ZodValidationErrorsCard"
import useLocaleContext from "#context/localeContext"
import styles from "../admin.module.scss"
import CreateUserForm from "./CreateUserForm"
import DeleteUser from "./DeleteUser"
import GetAllUsers from "./GetAllUsers"
import GetUser from "./GetUser"
import UpdateUserForm from "./UpdateUserForm"

const UsersCrud = ({
  showUsersSection,
  refreshAllUsersCounter,
  setEmailInUserError,
  setFieldErrors,
  setRefreshAllUsersCounter,
  emailInUserError,
  fieldErrors,
}) => {
  const { translate } = useLocaleContext()
  const errorText = translate.pages.signUp
  return (
    <div className={styles.usersCrudContainer}>
      {showUsersSection && (
        <div className={styles.formsContainer}>
          USER CRUD SECTION
          <div className={styles.crudContainer}>
            GET USER SECTION
            <GetUser />
          </div>
          <div className={styles.crudContainer}>
            GET ALL USERS SECTION
            <GetAllUsers refreshAllUsersCounter={refreshAllUsersCounter} />
          </div>
          <div className={styles.crudContainer}>
            CREATE USER
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
          <div className={styles.crudContainer}>
            UPDATE USER SECTION
            <UpdateUserForm />
          </div>
          <div className={styles.crudContainer}>
            DELETE USER SECTION
            <DeleteUser setRefreshAllUsersCounter={setRefreshAllUsersCounter} />
          </div>
        </div>
      )}
    </div>
  )
}

export default UsersCrud
