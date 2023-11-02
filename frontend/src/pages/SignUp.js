import LanguageDropdown from "#components/Navbar/LanguageDropdown"
import CreateUserForm from "#components/UsersCrud/CreateUserForm"
import ZodValidationErrorsCard from "#components/ZodValidationErrorsCard"
import useLocaleContext from "#context/localeContext"
import { useEffectScrollTop } from "#utils/utils"
import { useState } from "react"
import { Link } from "react-router-dom"
import styles from "./signUp.module.scss"

const SignUp = () => {
  const [emailInUserError, setEmailInUserError] = useState("")
  const [fieldErrors, setFieldErrors] = useState({})

  const { translate } = useLocaleContext()
  const text = translate.pages.signUp

  useEffectScrollTop()

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
          <CreateUserForm
            setFieldErrors={setFieldErrors}
            setEmailInUserError={setEmailInUserError}
          />
        </div>

        <div className={styles.loginContainer}>
          <span>
            {text.haveAccount} <Link to='/login'>{text.login}</Link>
          </span>
        </div>
        <div className={styles.errorsContainer}>
          {emailInUserError && (
            <div className={styles.errorMessage}>{emailInUserError}</div>
          )}
          {fieldErrors && (
            <ZodValidationErrorsCard fieldErrors={fieldErrors} text={text} />
          )}
        </div>
      </div>
    </div>
  )
}

export default SignUp
