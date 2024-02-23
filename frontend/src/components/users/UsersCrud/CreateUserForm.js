import NotificationCard from "#components/ui/NotificationCard"
import {
  DEFAULT_USER_IMAGE,
  LONG_MESSAGE_TIMEOUT,
  LONG_REDIRECT_TIMEOUT,
  ROUTES_CURRENT_ADMIN,
  ROUTES_CURRENT_CUSTOMER,
  ROUTES_LOGIN,
  ROUTES_SIGN_UP,
  ROUTES_SIGN_UP_ADMIN,
  SHORT_MESSAGE_TIMEOUT,
} from "#constants/constants"
import useLocaleContext from "#context/localeContext"
import useUserContext from "#context/userContext"
import { uploadToS3 } from "#utils/dataManipulation"
import {
  createNewAdmin,
  createNewUser,
  getLoggedInUser,
  loginUserWithIdAfterCreation,
} from "#utils/users"
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styles from "./createUserForm.module.scss"

const CreateUserForm = ({ setRefreshAllUsersCounter }) => {
  const [notification, setNotification] = useState()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [file, setFile] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [validationErrors, setValidationErrors] = useState([])
  const { setIsLoggedIn } = useUserContext()
  const { translate } = useLocaleContext()
  const location = useLocation()
  const navigate = useNavigate()

  const text = translate.components.crud
  const textValidationErrors = translate.errors.validationErrors
  const currentPath = location.pathname

  const setFileToUpload = (e) => {
    setFile(e.target.files[0])
  }

  const createUser = async (e) => {
    e.preventDefault()
    let image = await uploadToS3(file)
    if (!image) {
      image = DEFAULT_USER_IMAGE
    }

    const newUser = { firstName, lastName, email, password, image }
    try {
      let newUserResponse

      if (currentPath.includes(ROUTES_SIGN_UP_ADMIN)) {
        newUserResponse = await createNewAdmin(newUser)
      } else {
        newUserResponse = await createNewUser(newUser)
      }

      if (
        newUserResponse &&
        newUserResponse.data &&
        currentPath.includes(ROUTES_CURRENT_ADMIN)
      ) {
        setRefreshAllUsersCounter((prevCounter) => prevCounter + 1)
        setNotification(text.createUser.success)
        setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
        return
      }

      if (
        newUserResponse &&
        newUserResponse.data &&
        (currentPath.includes(ROUTES_SIGN_UP_ADMIN) ||
          currentPath.includes(ROUTES_SIGN_UP))
      ) {
        const loginResponse = await loginUserWithIdAfterCreation(
          email,
          password,
        )
        if (loginResponse && loginResponse.status === 200) {
          try {
            const loggedInUserResponse = await getLoggedInUser(
              newUserResponse.data.user.id,
            )
            if (loggedInUserResponse && loggedInUserResponse.status === 200) {
              setIsLoggedIn(true)
              setTimeout(
                () => navigate(ROUTES_CURRENT_CUSTOMER),
                LONG_REDIRECT_TIMEOUT,
              )
            }
          } catch (error) {
            setNotification(`${text.createUser.error}`)
            setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
            console.error("Error fetching user data", error)
          }
        }
      }
    } catch (error) {
      setNotification(null)
      setValidationErrors([])
      if (error.response && error.response.data) {
        if (error.response.data.errors) {
          const errorMessages = error.response.data.errors
          setValidationErrors(errorMessages)
          setTimeout(() => setValidationErrors([]), LONG_MESSAGE_TIMEOUT)
        } else if (error.response.data.message) {
          if (error.response.data.message === "Email already in use") {
            setNotification(text.createUser.emailInUseErrorMessage)
            setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
          } else {
            setNotification(error.response.data.message)
            setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
          }
        }
      } else {
        setNotification("error by creating user")
        setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
      }
    }
  }

  return (
    <div
      className={styles.createUserFormWrapper}
      style={
        currentPath.includes(ROUTES_SIGN_UP) ||
        currentPath.includes(ROUTES_LOGIN)
          ? { width: "300px", margin: "0" }
          : {}
      }
    >
      {notification && (
        <NotificationCard
          message={notification}
          errosMessageArray={validationErrors}
          textValidationErrorsObject={textValidationErrors}
        />
      )}
      {validationErrors && validationErrors.length > 0 && (
        <NotificationCard
          message={""}
          errorsMessageArray={validationErrors}
          textValidationErrorsObject={textValidationErrors}
        />
      )}

      <form className={styles.form} onSubmit={createUser}>
        <input
          className={styles.formField}
          name='firstName'
          type='text'
          value={firstName}
          placeholder={text.forms.commonProperties.firstName}
          onChange={(e) => setFirstName(e.target.value)}
          autoComplete='true'
          required
        ></input>

        <input
          className={styles.formField}
          name='lastName'
          type='text'
          value={lastName}
          placeholder={text.forms.commonProperties.lastName}
          onChange={(e) => setLastName(e.target.value)}
          autoComplete='true'
          required
        ></input>

        <input
          className={styles.formField}
          type='email'
          value={email}
          placeholder={text.forms.commonProperties.email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete='true'
          required
        ></input>

        <div className={styles.passwordInputAndToggleButtonContainer}>
          <input
            className={styles.formField}
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder={text.forms.commonProperties.password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='true'
            required
          ></input>

          <button type='button' onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <FontAwesomeIcon icon={faUnlock} />
            ) : (
              <FontAwesomeIcon icon={faLock} />
            )}
          </button>
        </div>

        {!currentPath.includes("/sign-up") &&
          !currentPath.includes("/sign-up-admin") && (
            <div className={styles.labelAndInputContainer}>
              <span className={styles.label}>
                {file ? "Selected file: " : "Select a file"}
              </span>
              <label className={styles.labelForFile} htmlFor='fileInput'>
                {file ? file.name : "Search on device"}
              </label>

              <input
                type='file'
                name='image'
                id='fileInput'
                onChange={setFileToUpload}
              />
            </div>
          )}

        <button className={styles.formButton} type='submit'>
          {currentPath.includes("/sign-up-admin")
            ? text.createUser.submitAdminButton
            : text.createUser.submitCustomerButton}
        </button>
      </form>
    </div>
  )
}

export default CreateUserForm
