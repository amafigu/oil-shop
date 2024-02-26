import SubNavbar from "#components/ui/Navbar/SubNavbar"
import NotificationCard from "#components/ui/NotificationCard"
import { API_USERS_CURRENT_PREFIX } from "#constants/api"
import { LOGO_IMAGE } from "#constants/media"
import { ROUTES_SIGN_UP } from "#constants/routes"
import { LONG_MESSAGE_TIMEOUT, REDIRECT_TIMEOUT } from "#constants/time"
import useUserContext from "#context/userContext"
import { useTranslation } from "#hooks/useTranslation"
import { getIconByName } from "#utils/icons"
import { scrollToTop } from "#utils/render"
import { loginUser } from "#utils/users"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styles from "./login.module.scss"
const Login = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const { translate } = useTranslation()
  const { setIsLoggedIn, setUserEmail, setUser } = useUserContext()
  const text = translate.pages.login
  const textPassword = translate.components.crud

  const navigate = useNavigate()

  scrollToTop()

  const loginUserAndSetState = async (e) => {
    e.preventDefault()
    try {
      const loginUserResponse = await loginUser(email, password)
      if (loginUserResponse) {
        setUserEmail(loginUserResponse.userEmail)
        setIsLoggedIn(loginUserResponse.isLoggedIn)
        setUser(loginUserResponse.user)
        setTimeout(
          () =>
            navigate(
              `${API_USERS_CURRENT_PREFIX}${loginUserResponse.userRole}`,
            ),
          REDIRECT_TIMEOUT,
        )
      }
    } catch (error) {
      setErrorMessage(`${text.errorMessage}`)
      setTimeout(() => setErrorMessage(null), LONG_MESSAGE_TIMEOUT)
      console.error("Login error", error)
    }
  }

  return (
    <div className={styles.loginPageWrapper}>
      {errorMessage && <NotificationCard message={errorMessage} />}
      <div className={styles.subNavbarContainer}>
        <SubNavbar />
      </div>
      <div className={styles.loginPage}>
        <div className={styles.languageOptionsAndFormContainer}>
          <div className={styles.logoAndFormContainer}>
            <div className={styles.logoContainer}>
              <img
                className={styles.logo}
                src={`${process.env.PUBLIC_URL}${LOGO_IMAGE}`}
                alt='logo'
              />
            </div>
            <div className={styles.formContainer}>
              <form className={styles.form} onSubmit={loginUserAndSetState}>
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

                <div className={styles.passwordInputAndToggleButtonContainer}>
                  <input
                    className={styles.formField}
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder={textPassword.forms.commonProperties.password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete='true'
                    name='password'
                    required
                  ></input>

                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FontAwesomeIcon icon={getIconByName("faUnlock")} />
                    ) : (
                      <FontAwesomeIcon icon={getIconByName("faLock")} />
                    )}
                  </button>
                </div>
                <button className={styles.formButton} type='submit'>
                  {text.loginButton}
                </button>
              </form>
            </div>
            <div className={styles.divider}>{text.or}</div>
            <div className={styles.lostPasswordContainer}>
              {/* <Link to='/accounts/password/reset'>{text.passwordLost}</Link> */}
            </div>
          </div>
          <div className={styles.linkContainer}>
            <span>
              {text.haveAccount}{" "}
              <Link to={ROUTES_SIGN_UP} className={styles.link}>
                {text.signUp}
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
