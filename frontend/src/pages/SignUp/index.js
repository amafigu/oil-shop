import { NavigationMenu } from "#components/ui/NavigationMenu"
import CreateUserForm from "#components/users/UsersCrud/CreateUserForm"
import { LOGO_IMAGE } from "#constants/media"
import { pageNavigationItems } from "#constants/navigation"
import { scrollToTop } from "#utils/render"
import { LinkContainer } from "./LinkContainer"
import styles from "./signUp.module.scss"

export const SignUp = () => {
  scrollToTop()

  return (
    <main className={styles.signUpPage}>
      <div className={styles.subNavbarContainer}>
        <NavigationMenu
          items={pageNavigationItems}
          navigationProperty={"link"}
        />
      </div>
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
