import { REPOSITORY_URL } from "#constants/media"
import { useTranslation } from "#hooks/useTranslation"
import { scrollToTop } from "#utils/scrollToTop"
import { Link } from "react-router-dom"
import styles from "./about.module.scss"

export const About = () => {
  const { translate } = useTranslation()
  const text = translate.pages.about
  scrollToTop()

  return (
    <main className={styles.wrapper} aria-label='about page'>
      <section className={styles.container}>
        <h1 className={styles.title}>{text.title}</h1>
        <p className={styles.link}>
          <Link to={REPOSITORY_URL}>To Source Code</Link>
        </p>
      </section>
    </main>
  )
}
