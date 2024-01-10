import NotificationCard from "#components/NotificationCard"
import useLocaleContext from "#context/localeContext"
import useUserContext from "#context/userContext"
import {
  API_LOGIN,
  API_USERS_CREATE,
  API_USERS_CURRENT_USER,
  DEFAULT_USER_IMAGE,
  LONG_MESSAGE_TIMEOUT,
  ROUTES_CURRENT_CUSTOMER,
  ROUTES_LOGIN,
  ROUTES_SIGN_UP,
} from "#utils/constants"
import { uploadToS3 } from "#utils/dataManipulation"
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { SHORT_MESSAGE_TIMEOUT } from "../../utils/constants"
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
  //const { setIsLoggedIn, setUserEmail, setUser } = useUserContext()
  const { setIsLoggedIn } = useUserContext()

  const { translate } = useLocaleContext()
  const text = translate.components.crud
  const textValidationErrors = translate.errors.validationErrors

  const location = useLocation()
  const currentPath = location.pathname
  const navigate = useNavigate()

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
      const newUserResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}${API_USERS_CREATE}`,
        newUser,
      )
      if (newUserResponse && currentPath.includes("/current-admin")) {
        setRefreshAllUsersCounter((prevCounter) => prevCounter + 1)
        setNotification("user created")
        setTimeout(() => setNotification(null), 3000)
        return
      }

      if (currentPath.includes("/sign-up")) {
        const loginResponse = await axios.post(
          `${process.env.REACT_APP_API_URL}${API_LOGIN}`,
          { email, password },
          { withCredentials: true },
        )
        if (loginResponse && loginResponse.status === 200) {
          const getLoggedInUser = async () => {
            try {
              const userResponse = await axios.get(
                `${process.env.REACT_APP_API_URL}${API_USERS_CURRENT_USER}/${newUserResponse.data.user.id}`,
                { withCredentials: true },
              )

              setIsLoggedIn(true)
            } catch (error) {
              setNotification(`${text.errorMessage}`)
              setTimeout(() => setNotification(null), 3000)
              console.error("Error fetching user data", error)
            }
          }
          getLoggedInUser()
          setTimeout(() => navigate(ROUTES_CURRENT_CUSTOMER), 2000)
        }
      }
    } catch (error) {
      if (error.response.data.errors) {
        const errorMessages = error.response.data.errors
        setValidationErrors(errorMessages)

        setTimeout(() => setValidationErrors([]), LONG_MESSAGE_TIMEOUT)
      }

      if (error.response.data.message === "Email already in use") {
        setNotification(`Email already in use`)
        setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
      }
      console.error("Signup error", error)
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

        {!currentPath.includes("/sign-up") && (
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
          {text.createUser.submitButton}
        </button>
      </form>
    </div>
  )
}

export default CreateUserForm
