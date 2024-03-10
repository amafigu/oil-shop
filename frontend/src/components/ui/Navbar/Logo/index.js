import { LOGO_IMAGE } from "#constants/media"
import { ROUTES_HOME } from "#constants/routes"
import { Link } from "react-router-dom"
import styles from "./logo.module.scss"

export const Logo = () => {
  return (
    <div className={styles.logoContainer}>
      <Link className={styles.linkChild} to={ROUTES_HOME}>
        <img
          className={styles.logo}
          src={`${process.env.PUBLIC_URL}${LOGO_IMAGE}`}
          alt='logo'
        />
      </Link>
    </div>
  )
}
