import { LOGO_IMAGE } from "#constants/media"
import { useTranslation } from "#hooks/useTranslation"
import { scrollToTop } from "#utils/scrollToTop"
import styles from "./notFound.module.scss"

export const NotFound = () => {
  const { translate } = useTranslation()
  const text = translate.pages.notFound
  scrollToTop()

  return (
    <main className={styles.notFoundPage} aria-label='Page not found'>
      <section className={styles.container}>
        <img
          className={styles.logo}
          src={`${process.env.PUBLIC_URL}${LOGO_IMAGE}`}
          alt='logo'
        />
        <p className={styles.message}>{text}</p>
      </section>
    </main>
  )
}
