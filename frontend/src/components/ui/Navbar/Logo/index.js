import { LOGO_IMAGE } from "#constants/media"
import { ROUTES_HOME } from "#constants/routes"
import { Link } from "react-router-dom"
import styles from "./logo.module.scss"

export const Logo = () => {
  return (
    <div className={styles.container}>
      <Link className={styles.link} to={ROUTES_HOME}>
        <img
          className={styles.logo}
          src={`${process.env.PUBLIC_URL}${LOGO_IMAGE}`}
          alt='logo'
        />
      </Link>
    </div>
  )
}
