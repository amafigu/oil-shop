import CreateUserForm from "#components/users/UsersCrud/CreateUserForm"
import { LOGO_IMAGE } from "#constants/media"
import { scrollToTop } from "#utils/scrollToTop"
import { LinkContainer } from "./LinkContainer"
import styles from "./signUp.module.scss"

export const SignUp = () => {
  scrollToTop()

  return (
    <main className={styles.signUpPage}>
      <section className={styles.logoAndSignUpForm}>
        <div className={styles.logoContainer}>
          <img
            className={styles.logo}
            src={`${process.env.PUBLIC_URL}${LOGO_IMAGE}`}
            alt='logo'
          />
        </div>
        <div className={styles.form}>
          <CreateUserForm />
        </div>
        <LinkContainer />
      </section>
    </main>
  )
}
