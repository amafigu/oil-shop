import { CreateItem } from "#components/ui/CreateItem"
import { LOGO_IMAGE } from "#constants/media"
import { registerUserProperties } from "#constants/users"
import { useRegisterUserAndRedirect } from "#hooks/useRegisterUserAndRedirect"
import { listenInput } from "#utils/listenInput"
import { scrollToTop } from "#utils/scrollToTop"
import { LinkContainer } from "./LinkContainer"
import styles from "./signUp.module.scss"

export const SignUp = () => {
  const { registerUserAndRedirect } = useRegisterUserAndRedirect()
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
        <div className={styles.form} aria-label='Create new user form'>
          <CreateItem
            onCreate={registerUserAndRedirect}
            onChange={listenInput}
            renderItemProps={registerUserProperties}
          />
        </div>
        <LinkContainer />
      </section>
    </main>
  )
}
