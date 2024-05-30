import NotificationCard from "#components/ui/NotificationCard"
import { LOGO_IMAGE } from "#constants/media"
import { SIGN_UP } from "#constants/routes"
import { useLoginAndRedirect } from "#hooks/useLoginAndRedirect"
import { useTranslation } from "#hooks/useTranslation"
import { scrollToTop } from "#utils/scrollToTop"
import { Link } from "react-router-dom"
import { LoginForm } from "./LoginForm"
import styles from "./login.module.scss"

export const Login = () => {
  const { notification } = useLoginAndRedirect()
  const { translate } = useTranslation()
  const text = translate.pages.login

  scrollToTop()

  return (
    <main className={styles.wrapper} aria-label='Login page'>
      {notification && <NotificationCard message={notification} />}
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <div className={styles.logoContainer}>
            <img
              className={styles.logo}
              src={`${process.env.PUBLIC_URL}${LOGO_IMAGE}`}
              alt='logo'
            />
          </div>
          <LoginForm />
        </div>
        <div className={styles.linkContainer}>
          <span aria-label='Create account'>
            {text.haveAccount}{" "}
            <Link to={SIGN_UP} className={styles.link}>
              {text.signUp}
            </Link>
          </span>
        </div>
      </div>
    </main>
  )
}
