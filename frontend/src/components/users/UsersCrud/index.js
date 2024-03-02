import { ToggleButton } from "#components/ui/ToggleButton"
import ZodValidationErrorsCard from "#components/ui/ZodValidationErrorsCard"
import { useTranslation } from "#hooks/useTranslation"
import { useState } from "react"
import CreateUserForm from "./CreateUserForm"
import EditableUserData from "./EditableUserData"
import GetAllUsers from "./GetAllUsers"
import styles from "./usersCrud.module.scss"
const UsersCrud = ({
  setEmailInUserError,
  setFieldErrors,
  emailInUserError,
  fieldErrors,
}) => {
  const [showUsersSection, setShowUsersSection] = useState(false)
  const [showCreateUserForm, setShowCreateUserForm] = useState(false)
  const [refreshAllUsersCounter, setRefreshAllUsersCounter] = useState(0)

  const { translate } = useTranslation()
  const errorText = translate.pages.signUp
  const toggleButtonText =
    translate.components.crud.forms.toggleUsersCrudOptions

  return (
    <div className={styles.usersCrudWrapper}>
      <ToggleButton
        isVisible={showUsersSection}
        onToggle={setShowUsersSection}
        hideBtnText={toggleButtonText.hide.toUpperCase()}
        showBtnText={toggleButtonText.show.toUpperCase()}
        classCss='showHideButtons'
      />
      {showUsersSection && (
        <div className={styles.formsContainer}>
          <div className={styles.crudContainer}>
            <GetAllUsers
              refreshAllUsersCounter={refreshAllUsersCounter}
              setRefreshAllUsersCounter={setRefreshAllUsersCounter}
            />
          </div>

          <div className={styles.crudContainer}>
            <EditableUserData
              setRefreshAllUsersCounter={setRefreshAllUsersCounter}
            />
          </div>

          <div className={styles.crudContainer}>
            <ToggleButton
              isVisible={showCreateUserForm}
              onToggle={setShowCreateUserForm}
              hideBtnText={"HIDE USER FORM"}
              showBtnText={"CREATE USER"}
              classCss='showHideButtons'
            />
            {showCreateUserForm && (
              <CreateUserForm
                setRefreshAllUsersCounter={setRefreshAllUsersCounter}
                setFieldErrors={setFieldErrors}
                setEmailInUserError={setEmailInUserError}
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
