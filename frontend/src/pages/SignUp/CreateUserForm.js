import useLocaleContext from "#context/localeContext"
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import styles from "./createUserForm.module.scss"

const CreateUserForm = ({ setFieldErrors, setEmailInUserError }) => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  const { translate } = useLocaleContext()

  const location = useLocation()
  const currentPath = location.pathname

  const doNotRedirectFrom = ["/users/current-admin"]

  const text = translate.components.crud

  const createUser = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/users/create`, {
        firstName,
        lastName,
        email,
        password,
      })
      if (!currentPath.includes(doNotRedirectFrom)) {
        navigate("/users/current-user")
      }
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
        setEmailInUserError(`${text.createUser.emailInUseErrorMessage}`)
        setTimeout(() => setEmailInUserError(null), 6000)
      }

      console.error("Signup error", error)
    }
  }

  return (
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

      <button className={styles.formButton} type='submit'>
        {text.createUser.submitButton}
      </button>
    </form>
  )
}

export default CreateUserForm
