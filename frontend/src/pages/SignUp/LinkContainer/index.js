import {
  ROUTES_LOGIN,
  ROUTES_SIGN_UP,
  ROUTES_SIGN_UP_ADMIN,
} from "#constants/routes"
import { useTranslation } from "#hooks/useTranslation"
import { Link, useLocation } from "react-router-dom"
import styles from "./linkContainer.module.scss"

export const LinkContainer = () => {
  const { translate } = useTranslation()
  const text = translate.pages.signUp
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <nav className={styles.linkContainer} aria-label='Navigation links'>
      <ul className={styles.linksList}>
        <li aria-label='Navigate to login page'>
          {text.haveAccount}{" "}
          <Link className={styles.link} to={ROUTES_LOGIN}>
            {text.login}
          </Link>
        </li>
        <li
          aria-label={
            currentPath.includes(ROUTES_SIGN_UP_ADMIN)
              ? text.createCustomer
              : text.createAdminLink
          }
        >
          {currentPath.includes(ROUTES_SIGN_UP) &&
            !currentPath.includes(ROUTES_SIGN_UP_ADMIN) && (
              <>
                {text.createAdminText}{" "}
                <Link className={styles.link} to={ROUTES_SIGN_UP_ADMIN}>
                  {text.createAdminLink}
                </Link>
              </>
            )}
          {currentPath.includes(ROUTES_SIGN_UP_ADMIN) && (
            <>
              {text.doNotHaveAccount}{" "}
              <Link className={styles.link} to={ROUTES_SIGN_UP}>
                {text.createCustomer}
              </Link>
            </>
          )}
        </li>
      </ul>
    </nav>
  )
}
