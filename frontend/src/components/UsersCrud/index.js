import ToggleButton from "#components/ToggleButton"
import ZodValidationErrorsCard from "#components/ZodValidationErrorsCard"
import useLocaleContext from "#context/localeContext"
import { useState } from "react"
import CreateUserForm from "./CreateUserForm"
import EditableUserData from "./EditableUserData"
import GetAllUsers from "./GetAllUsers"
import styles from "./usersCrud.module.scss"
const UsersCrud = ({
  refreshAllUsersCounter,
  setEmailInUserError,
  setFieldErrors,
  setRefreshAllUsersCounter,
  emailInUserError,
  fieldErrors,
}) => {
  const [showUsersSection, setShowUsersSection] = useState(false)
  const [showCreateUserForm, setShowCreateUserForm] = useState(false)

  const { translate } = useLocaleContext()
  const errorText = translate.pages.signUp
  const toggleButtonText =
    translate.components.crud.forms.toggleUsersCrudOptions
  return (
    <div className={styles.usersCrudWrapper}>
      <ToggleButton
        show={showUsersSection}
        setToggle={setShowUsersSection}
        textHide={toggleButtonText.hide}
        textShow={toggleButtonText.show}
        classCss='showHideButtons'
      />
      {showUsersSection && (
        <div className={styles.formsContainer}>
          <div className={styles.crudContainer}>
            <GetAllUsers refreshAllUsersCounter={refreshAllUsersCounter} />
          </div>

          <div className={styles.crudContainer}>
            <EditableUserData />
          </div>

          <div className={styles.crudContainer}>
            <ToggleButton
              show={showCreateUserForm}
              setToggle={setShowCreateUserForm}
              textHide={"HIDE FORM"}
              textShow={"SHOW CREATE USER FORM"}
              classCss='showHideButtons'
            />
            {showCreateUserForm && (
              <CreateUserForm
                setEmailInUserError={setEmailInUserError}
                setFieldErrors={setFieldErrors}
                setRefreshAllUsersCounter={setRefreshAllUsersCounter}
              />
            )}

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
        </div>
      )}
    </div>
  )
}

export default UsersCrud
