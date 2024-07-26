import { CreateUserForm } from "@/components/ui/CreateUserForm"
import { SHOP } from "@/constants/routes"
import { useRegisterUser } from "@/hooks/useRegisterUser"
import { getIconByName } from "@/utils/getIconByName"
import { scrollToTop } from "@/utils/scrollToTop"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FC } from "react"
import { Link } from "react-router-dom"
import { LinkContainer } from "./LinkContainer"
import styles from "./signUp.module.scss"

export const SignUp: FC = () => {
  const { registerUser } = useRegisterUser()
  scrollToTop()

  return (
    <main className={styles.signUpPage} aria-label='Sign up page'>
      <div className={styles.backLinkContainer}>
        <Link to={SHOP} className={styles.link}>
          <FontAwesomeIcon icon={getIconByName("faChevronLeft")} size='xs' />{" "}
          Shop
        </Link>
      </div>
      <div className={styles.linkContainer}>
        <LinkContainer />
      </div>
      <div className={styles.formContainer}>
        <CreateUserForm onCreate={registerUser} />
      </div>
    </main>
  )
}
