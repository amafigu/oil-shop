import { questionsAndAnswers } from "@/constants/faq"
import { useTranslation } from "@/hooks/useTranslation"
import { Translation } from "@/types/Locale"
import { scrollToTop } from "@/utils/scrollToTop"
import { FC } from "react"
import styles from "./faq.module.scss"

const faqKeys = [
  "difuserRoomSizeQuestion",
  "difuserRoomSizeAnswer",
  "howDifuserWorksQuestion",
  "howDifuserWorksAnswer",
  "thirdQuestion",
  "thirdAnswer",
  "fourthQuestion",
  "fourthAnswer",
  "addBodyOilAndUsedAsCosmeticQuestion",
  "addBodyOilAndUsedAsCosmeticAnswer",
  "sixthQuestion",
  "sixthAnswer",
  "seventhQuestion",
  "seventhAnswer",
  "eighthQuestion",
  "eighthAnswer",
  "ninthQuestion",
  "ninthAnswer",
  "tenthQuestion",
  "tenthAnswer",
] as const

type FaqKey = (typeof faqKeys)[number]

interface QuestionAnswer {
  question: FaqKey
  answer: FaqKey
}

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
