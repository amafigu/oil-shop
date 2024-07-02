import { QuestionAnswer, questionsAndAnswers } from "@/constants/faq"
import { useTranslation } from "@/hooks/useTranslation"
import { Translation } from "@/types/Locale"
import { scrollToTop } from "@/utils/scrollToTop"
import { FC } from "react"
import styles from "./faq.module.scss"

export const Faq: FC = () => {
  const { translate } = useTranslation() as Translation
  const text = translate.pages.faq
  scrollToTop()

  return (
    <main className={styles.wrapper} aria-label='Frequent asked questions page'>
      <div className={styles.container}>
        <section className={styles.questionsAndAnswers}>
          <ul>
            {questionsAndAnswers.map((item: QuestionAnswer) => (
              <li key={item.question}>
                <p className={styles.title} aria-label='question'>
                  {text[item.question]}
                </p>
                <p className={styles.subtitle} aria-label='answer'>
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
