import LanguageDropdown from "#components/LanguageDropdown"
import SubNavbar from "#components/Navbar/SubNavbar"
import NotificationCard from "#components/NotificationCard"
import useLocaleContext from "#context/localeContext"
import useUserContext from "#context/userContext"
import {
  API_USERS_CURRENT_PREFIX,
  LOGO_IMAGE,
  LONG_MESSAGE_TIMEOUT,
  REDIRECT_TIMEOUT,
  ROUTES_SIGN_UP,
} from "#utils/constants"
import { useEffectScrollTop } from "#utils/render"
import { loginUser } from "#utils/users"
import {
  faChevronDown,
  faChevronUp,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styles from "./login.module.scss"
const Login = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const [email, setEmail] = useState("")
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const [password, setPassword] = useState("")
  const { setIsLoggedIn, setUserEmail, setUser } = useUserContext()
  const { translate } = useLocaleContext()
  const text = translate.pages.login
  const navigate = useNavigate()

  useEffectScrollTop()

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
            <div className={styles.languageOptionsContainer}>
              <div
                onClick={() =>
                  setDropdownOpen((isDropdownOpen) => !isDropdownOpen)
                }
              >
                <div className={styles.languageChevronContainer}>
                  <FontAwesomeIcon
                    icon={faGlobe}
                    className={styles.languageIcon}
                  />
                  {!isDropdownOpen && (
                    <FontAwesomeIcon icon={faChevronDown} size='2xs' />
                  )}
                  {isDropdownOpen && (
                    <FontAwesomeIcon icon={faChevronUp} size='2xs' />
                  )}
                </div>
              </div>
              {isDropdownOpen && (
                <div className={styles.languageDropdownContainer}>
                  <LanguageDropdown />
                </div>
              )}
            </div>
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
