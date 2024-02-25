import { LOGO_IMAGE } from "#constants/media"
import styles from "./notFound.module.scss"

const NotFound = () => {
  return (
    <div className={styles.notFoundPageWrapper}>
      <div className={styles.notFoundPage}>
        <div className={styles.container}>
          <img
            className={styles.logo}
            src={`${process.env.PUBLIC_URL}${LOGO_IMAGE}`}
            alt='logo'
          />
          <div className={styles.message}>Sorry, this page is not there</div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
