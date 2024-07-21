import { QuestionAnswer, questionsAndAnswers } from "@/constants/faq"
import { useTranslation } from "@/hooks/useTranslation"
import { Translation } from "@/types/Locale"
import { scrollToTop } from "@/utils/scrollToTop"
import { FC } from "react"
import styles from "./faq.module.scss"

export const Faq: FC = () => {
  const { pages } = useTranslation() as Translation
  const text = pages.faq
  scrollToTop()

  return (
    <main className={styles.faqPage}>
      <section className={styles.listContainer}>
        <ul className={styles.list}>
          {questionsAndAnswers.map((item: QuestionAnswer) => (
            <li className={styles.listItem} key={item.question}>
              <p className={styles.title}>{text[item.question]}</p>
              <p className={styles.text}>{text[item.answer]}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
