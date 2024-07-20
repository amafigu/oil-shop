import { LOGO_IMAGE } from "@/constants/media"
import { HOME } from "@/constants/routes"
import { Link } from "react-router-dom"
import styles from "./logo.module.scss"

export const Logo = () => {
  return (
    <div className={styles.container}>
      <Link className={styles.link} to={HOME}>
        <img className={styles.logo} src={LOGO_IMAGE} alt='logo' />
      </Link>
    </div>
  )
}
