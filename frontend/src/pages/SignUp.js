import SubNavbar from "#components/ui/Navbar/SubNavbar"
import CreateUserForm from "#components/users/UsersCrud/CreateUserForm"
import { LOGO_IMAGE } from "#constants/media"
import {
  ROUTES_LOGIN,
  ROUTES_SIGN_UP,
  ROUTES_SIGN_UP_ADMIN,
} from "#constants/routes"
import { useTranslation } from "#hooks/useTranslation"
import { scrollToTop } from "#utils/render"
import { Link, useLocation } from "react-router-dom"
import styles from "./signUp.module.scss"

const SignUp = () => {
  const { translate } = useTranslation()
  const text = translate.pages.signUp
  const location = useLocation()
  const currentPath = location.pathname

  scrollToTop()

  return (
    <div className={styles.signUpPageWrapper}>
      <div className={styles.subNavbarContainer}>
        <SubNavbar />
      </div>
      <div className={styles.signUpPage}>
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
              <div className={styles.form}>
                <CreateUserForm />
              </div>
            </div>
          </div>

          <div className={styles.linkContainer}>
            <span>
              {text.haveAccount}{" "}
              <Link className={styles.link} to={ROUTES_LOGIN}>
                {text.login}
              </Link>
            </span>
            <span>
              {currentPath.includes("/sign-up") &&
                !currentPath.includes("/sign-up-admin") && (
                  <>
                    {text.createAdminText}{" "}
                    <Link className={styles.link} to={ROUTES_SIGN_UP_ADMIN}>
                      {text.createAdminLink}
                    </Link>
                  </>
                )}
              {currentPath.includes("/sign-up-admin") && (
                <>
                  {text.doNotHaveAccount}{" "}
                  <Link className={styles.link} to={ROUTES_SIGN_UP}>
                    {text.createCustomer}
                  </Link>
                </>
              )}
            </span>
          </div>
        </div>
        <div className={styles.errorsContainer}></div>
      </div>
    </div>
  )
}

export default SignUp
