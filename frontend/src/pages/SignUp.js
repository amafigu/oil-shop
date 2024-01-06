import LanguageDropdown from "#components/LanguageDropdown"
import SubNavbar from "#components/Navbar/SubNavbar"
import NotificationCard from "#components/NotificationCard"
import CreateUserForm from "#components/UsersCrud/CreateUserForm"
import useLocaleContext from "#context/localeContext"
import { LOGO_IMAGE, ROUTES_LOGIN } from "#utils/constants"
import { useEffectScrollTop } from "#utils/render"
import {
  faChevronDown,
  faChevronUp,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Link } from "react-router-dom"
import styles from "./signUp.module.scss"

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const [emailInUserError, setEmailInUserError] = useState("")
  const [fieldErrors, setFieldErrors] = useState({})
  const [isDropdownOpen, setDropdownOpen] = useState(false)

  const { translate } = useLocaleContext()
  const text = translate.pages.signUp

  useEffectScrollTop()

  return (
    <div className={styles.signUpPageWrapper}>
      {errorMessage && <NotificationCard message={errorMessage} />}
      <div className={styles.subNavbarContainer}>
        <SubNavbar />
      </div>
      <div className={styles.signUpPage}>
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
              <div className={styles.form}>
                <CreateUserForm
                  setFieldErrors={setFieldErrors}
                  setEmailInUserError={setEmailInUserError}
                />
              </div>
            </div>
          </div>

          <div className={styles.linkContainer}>
            <span>
              {text.haveAccount} <Link to={ROUTES_LOGIN}>{text.login}</Link>
            </span>
          </div>
        </div>
        {/* <div className={styles.errorsContainer}>
          {emailInUserError && (
            <div className={styles.errorMessage}>{emailInUserError}</div>
          )}
          {fieldErrors && (
            <ZodValidationErrorsCard fieldErrors={fieldErrors} text={text} />
          )}
        </div> */}
      </div>
    </div>
  )
}

export default SignUp
