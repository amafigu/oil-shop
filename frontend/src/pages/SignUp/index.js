import { CreateItem } from "#components/ui/CreateItem"
import { LOGO_IMAGE } from "#constants/media"
import { registerUserProperties } from "#constants/users"
import { useCountUsers } from "#hooks/useCountUsers"
import { useRegisterUserAndRedirect } from "#hooks/useRegisterUserAndRedirect"
import { listenInputChangeAndSetDataObject } from "#utils/listenInputChangeAndSetDataObject"
import { scrollToTop } from "#utils/scrollToTop"
import { LinkContainer } from "./LinkContainer"
import styles from "./signUp.module.scss"

export const SignUp = () => {
  scrollToTop()
  const { setCounter } = useCountUsers()
  const { registerUserAndRedirect } = useRegisterUserAndRedirect()

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
          <CreateItem
            onCreate={registerUserAndRedirect}
            onChange={listenInputChangeAndSetDataObject}
            setCounter={setCounter}
            renderItemProps={registerUserProperties}
          />
        </div>
        <LinkContainer />
      </section>
    </main>
  )
}
