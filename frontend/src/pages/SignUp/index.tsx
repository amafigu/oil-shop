import { CreateUserForm } from "#components/ui/CreateUserForm"
import { LOGO_IMAGE } from "#constants/media"
import { useRegisterUser } from "#hooks/useRegisterUser"
import { scrollToTop } from "#utils/scrollToTop"
import { LinkContainer } from "./LinkContainer"
import styles from "./signUp.module.scss"

export const SignUp = () => {
  const { registerUser } = useRegisterUser()
  scrollToTop()

  return (
    <main className={styles.wrapper} aria-label='Sign up page'>
      <section className={styles.container}>
        <div className={styles.logoContainer}>
          <img
            className={styles.logo}
            src={`${process.env.PUBLIC_URL}${LOGO_IMAGE}`}
            alt='logo'
          />
        </div>
        <div className={styles.form}>
          <CreateUserForm onCreate={registerUser} />
        </div>
        <LinkContainer />
      </section>
    </main>
  )
}
