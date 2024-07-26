import { SHOP, SIGN_UP } from "@/constants/routes"
import { useTranslation } from "@/hooks/useTranslation"
import { getIconByName } from "@/utils/getIconByName"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FC } from "react"
import { Link } from "react-router-dom"
import { LoginForm } from "./LoginForm"
import styles from "./login.module.scss"

export const Login: FC = () => {
  const { translate } = useTranslation()
  const text = translate.pages.login

  return (
    <main className={styles.loginPage} aria-label='Login page'>
      <div className={styles.backLinkContainer}>
        <Link to={SHOP} className={styles.link}>
          <FontAwesomeIcon icon={getIconByName("faChevronLeft")} size='xs' />{" "}
          Shop
        </Link>
      </div>
      <div className={styles.linkContainer}>
        <span aria-label='Create account'>
          {text.haveAccount}{" "}
          <Link to={SIGN_UP} className={styles.link}>
            {text.signUp}
          </Link>
        </span>
      </div>
      <div className={styles.formContainer}>
        <LoginForm />
      </div>
    </main>
  )
}
