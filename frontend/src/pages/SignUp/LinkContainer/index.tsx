import { LOGIN, SIGN_UP, SIGN_UP_ADMIN } from "@/constants/routes"
import { useTranslation } from "@/hooks/useTranslation"
import { FC } from "react"
import { Link, useLocation } from "react-router-dom"
import styles from "./linkContainer.module.scss"

export const LinkContainer: FC = () => {
  const { translate } = useTranslation()
  const text = translate.pages.signUp
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <nav className={styles.wrapper} aria-label='Navigation links'>
      <ul className={styles.list}>
        <li aria-label='Navigate to login page'>
          {text.haveAccount}{" "}
          <Link className={styles.link} to={LOGIN}>
            {text.login}
          </Link>
        </li>
        <li
          aria-label={
            currentPath.includes(SIGN_UP_ADMIN)
              ? text.createCustomer
              : text.createAdminLink
          }
        >
          {currentPath.includes(SIGN_UP) &&
            !currentPath.includes(SIGN_UP_ADMIN) && (
              <>
                {text.createAdminText}{" "}
                <Link className={styles.link} to={SIGN_UP_ADMIN}>
                  {text.createAdminLink}
                </Link>
              </>
            )}
          {currentPath.includes(SIGN_UP_ADMIN) && (
            <>
              {text.doNotHaveAccount}{" "}
              <Link className={styles.link} to={SIGN_UP}>
                {text.createCustomer}
              </Link>
            </>
          )}
        </li>
      </ul>
    </nav>
  )
}
