import useLocaleContext from "#context/localeContext"
import useUserContext from "#context/userContext"
import {
  API_LOGIN,
  API_USERS_CURRENT_USER,
  API_USER_ROLE,
  API_VERIFY_TOKEN,
} from "#utils/constants"
import { getDataAndSetErrorMessage } from "#utils/dataManipulation"
import { useEffectScrollTop } from "#utils/render"
import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styles from "./login.module.scss"

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { translate } = useLocaleContext()
  const { setIsLoggedIn, setUserEmail, setUser } = useUserContext()
  const text = translate.pages.login
  const navigate = useNavigate()

  useEffectScrollTop()

  const login = async (e) => {
    e.preventDefault()
    try {
      const loginResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}${API_LOGIN}`,
        { email, password },
        { withCredentials: true },
      )
      if (loginResponse && loginResponse.status === 200) {
        const setLoggedInUser = async () => {
          try {
            const currentUserIdResponse = await axios.get(
              `${process.env.REACT_APP_API_URL}${API_VERIFY_TOKEN}`,
              { withCredentials: true },
            )

            const userId = currentUserIdResponse.data.id
            const userResponse = await getDataAndSetErrorMessage(
              userId,
              API_USERS_CURRENT_USER,
              setErrorMessage,
            )
            const loggedUser = userResponse.data
            if (userResponse.status === 200) {
              setUserEmail(loggedUser.email)
              setIsLoggedIn(true)
              setUser(loggedUser)

              const userRoleResponse = await axios.get(
                `${process.env.REACT_APP_API_URL}${API_USER_ROLE}/${loggedUser.roleId}`,
              )

              setTimeout(
                () => navigate(`/users/current-${userRoleResponse.data.name}`),
                500,
              )
            }
          } catch (error) {
            setErrorMessage(`${text.errorMessage}`)
            setTimeout(() => setErrorMessage(null), 10000)

            console.error("Error fetching user data", error)
          }
        }

        setLoggedInUser()
      }
    } catch (error) {
      setErrorMessage(`${text.errorMessage}`)
      setTimeout(() => setErrorMessage(null), 10000)
      console.error("Login error", error)
    }
  }

  return (
    <div className={styles.loginPageWrapper}>
      <div className={styles.loginPage}>
        <div className={styles.formContainer}>
          <div className={styles.logoContainer}>
            <img
              className={styles.logo}
              src={`${process.env.PUBLIC_URL}/assets/logo.png`}
              alt='logo'
            />
          </div>
          <form className={styles.form} onSubmit={login}>
            <label className={styles.label} htmlFor='email'>
              {text.email}
            </label>
            <input
              className={styles.formField}
              type='email'
              value={email}
              placeholder={text.emailPlaceholder}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete='true'
              name='email'
              required
            ></input>

            <label className={styles.label} htmlFor='password'>
              {text.password}
            </label>
            <input
              type='password'
              value={password}
              placeholder={text.passwordPlaceholder}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete='true'
              name='email'
              required
              className={styles.formField}
            ></input>

            <button className={styles.formButton} type='submit'>
              {text.loginButton}
            </button>
          </form>
          <div className={styles.divider}>{text.or}</div>
          {errorMessage && (
            <span className={styles.errorMessage}>{errorMessage}</span>
          )}
          <div className={styles.lostPasswordContainer}>
            <Link to='/accounts/password/reset'>{text.passwordLost}</Link>
          </div>
        </div>

        <div className={styles.signUpLinkContainer}>
          <span>
            {text.haveAccount}{" "}
            <Link to='/sign-up' className={styles.signUpLink}>
              {text.signUp}
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Login
