import { questionsAndAnswers } from "#constants/faq"
import { useTranslation } from "#hooks/useTranslation"
import { scrollToTop } from "#utils/scrollToTop"
import styles from "./faq.module.scss"

export const Faq = () => {
  const { translate } = useTranslation()
  const text = translate.pages.faq
  scrollToTop()

  return (
    <main
      className={styles.faqPageWrapper}
      aria-label='Frequent asked questions page'
    >
      <div className={styles.faqPage}>
        <section className={styles.questionsAndAnswers}>
          <ul>
            {questionsAndAnswers.map((item) => (
              <li key={item.question}>
                <p className={styles.question} aria-label='question'>
                  {text[item.question]}
                </p>
                <p className={styles.answer} aria-label='answer'>
                  {text[item.answer]}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}
