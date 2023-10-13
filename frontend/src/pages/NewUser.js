import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import useLocaleContext from "#context/localeContext"
import { useEffectScrollTop } from "#utils/utils"
import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import LanguageDropdown from "../components/Navbar/LanguageDropdown"
import styles from "./newUser.module.scss"

const NewUser = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})
  const [emailInUserError, setEmailInUserError] = useState("")
  const { translate } = useLocaleContext()
  const text = translate.pages.signUp
  const navigate = useNavigate()
  useEffectScrollTop()

  const createUser = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/users/create`, {
        firstName,
        lastName,
        email,
        password,
      })

      navigate("/users/current-user")
    } catch (error) {
      if (error.response.data.errors) {
        const errorMessages = error.response.data.errors.reduce((acc, err) => {
          if (!acc[err.path[0]]) {
            acc[err.path[0]] = []
          }
          acc[err.path[0]].push({
            code: err.code,
            message: err.message,
            path: err.path[0],
          })
          return acc
        }, {})
        console.log(errorMessages)

        setFieldErrors(errorMessages)
        setTimeout(() => setFieldErrors({}), 60000)
      }
      if (error.response.data.message === "Email already in use") {
        setEmailInUserError(`${text.emailInUseErrorMessage}`)
        setTimeout(() => setEmailInUserError(null), 6000)
      }

      console.error("Signup error", error)
    }
  }

  const translateErrors = (error) => {
    const translatedMessage = text.validationErrors[error.path]
    const customError = text.validationErrors[error.params]

    console.log("translated message", translatedMessage)
    console.log("translated customError", customError)
    if (translatedMessage) {
      console.log("if translated error.path ", error.path)
      console.log("if translated error.code ", error.code)
      console.log("if translated message", translatedMessage)
      return translatedMessage[error.code]
    } else {
      console.log("else translated error.code ", error.code)
      // If no translated message is found, you can return the original message or a default one
      return error.message // or return a default message like "Unknown error"
    }
  }

  return (
    <div className={styles.newUserPageWrapper}>
      <div className={styles.newUserPage}>
        <div className={styles.languagesContainer}>
          <LanguageDropdown />
        </div>

        <div className={styles.formContainer}>
          <div className={styles.logoContainer}>
            <img
              className={styles.logo}
              src={`${process.env.PUBLIC_URL}/assets/logo.png`}
              alt='logo'
            />
          </div>
          <form className={styles.form} onSubmit={createUser}>
            <input
              className={styles.formField}
              name='firstName'
              type='text'
              value={firstName}
              placeholder={text.firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete='true'
              required
            ></input>

            <input
              className={styles.formField}
              name='lastName'
              type='text'
              value={lastName}
              placeholder={text.lastName}
              onChange={(e) => setLastName(e.target.value)}
              autoComplete='true'
              required
            ></input>

            <input
              className={styles.formField}
              type='email'
              value={email}
              placeholder={text.email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete='true'
              required
            ></input>

            <div className={styles.passwordInputAndToggleButtonContainer}>
              <input
                className={styles.formField}
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder={text.password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete='true'
                required
              ></input>

              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faUnlock} />
                ) : (
                  <FontAwesomeIcon icon={faLock} />
                )}
              </button>
            </div>

            <button className={styles.formButton} type='submit'>
              {text.submitButton}
            </button>
          </form>
        </div>

        <div className={styles.loginContainer}>
          <span>
            {text.haveAccount} <Link to='/login'>{text.login}</Link>
          </span>
        </div>
        <div className={styles.errorsContainer}>
          {fieldErrors.firstName &&
            fieldErrors.firstName.map((error) => (
              <div key={error.message} className={styles.errorMessage}>
                {translateErrors(error)}
              </div>
            ))}
          {fieldErrors.lastName &&
            fieldErrors.lastName.map((error) => (
              <div key={error.message} className={styles.errorMessage}>
                {translateErrors(error)}
              </div>
            ))}
          {fieldErrors.email &&
            fieldErrors.email.map((error) => (
              <div key={error.message} className={styles.errorMessage}>
                {translateErrors(error)}
              </div>
            ))}
          {emailInUserError && (
            <div className={styles.errorMessage}>{emailInUserError}</div>
          )}
          {fieldErrors.password &&
            fieldErrors.password.map((error) => (
              <div key={error.message} className={styles.errorMessage}>
                {translateErrors(error)}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default NewUser
