import { useTranslation } from "#hooks/useTranslation"
import { scrollToTop } from "#utils/scrollToTop"
import styles from "./about.module.scss"

export const About = () => {
  const { translate } = useTranslation()
  const text = translate.pages.about
  scrollToTop()

  return (
    <main className={styles.aboutPageWrapper} aria-label='about page'>
      <section className={styles.aboutPage}>
        <h1 className={styles.title}>{text.title}</h1>
        <p className={styles.link}>
          Source Code:{" "}
          <a
            href='https://github.com/amafigu/oil-shop'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='source code link'
          >
            https://github.com/amafigu/oil-shop
          </a>
        </p>
      </section>
    </main>
  )
}
