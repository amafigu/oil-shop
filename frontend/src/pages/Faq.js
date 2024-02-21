import { scrollToTop } from "#utils/render"
import { React } from "react"
import useLocaleContext from "../context/localeContext"
import styles from "./faq.module.scss"

const Faq = () => {
  const { translate } = useLocaleContext()
  scrollToTop()
  return (
    <div className={styles.faqPageWrapper}>
      <div className={styles.faqPage}>
        <div className={styles.questionsAndAnswers}>
          <p className={styles.question}>
            {translate.pages.faq.difuserRoomSizeQuestion}
          </p>
          <p className={styles.answer}>
            {translate.pages.faq.difuserRoomSizeAnswer}
          </p>
          <p className={styles.question}>
            {translate.pages.faq.howDifuserWorksQuestion}
          </p>
          <p className={styles.answer}>
            {translate.pages.faq.howDifuserWorksAnswer}
          </p>
          <p className={styles.question}>{translate.pages.faq.thirdQuestion}</p>
          <p className={styles.answer}>{translate.pages.faq.thirdAnswer}</p>
          <p className={styles.question}>
            {translate.pages.faq.fourthQuestion}
          </p>
          <p className={styles.answer}>{translate.pages.faq.fourthAnswer}</p>
          <p className={styles.question}>
            {translate.pages.faq.addBodyOilAndUsedAsCosmeticQuestion}
          </p>
          <p className={styles.answer}>
            {translate.pages.faq.addBodyOilAndUsedAsCosmeticAnswer}
          </p>
          <p className={styles.question}>{translate.pages.faq.sixthQuestion}</p>
          <p className={styles.answer}>{translate.pages.faq.sixthAnswer}</p>
          <p className={styles.question}>
            {translate.pages.faq.seventhQuestion}
          </p>
          <p className={styles.answer}>{translate.pages.faq.seventhAnswer}</p>
          <p className={styles.question}>
            {translate.pages.faq.eighthQuestion}
          </p>
          <p className={styles.answer}>{translate.pages.faq.eighthAnswer}</p>
          <p className={styles.question}>{translate.pages.faq.ninthQuestion}</p>
          <p className={styles.answer}>{translate.pages.faq.ninthAnswer}</p>
          <p className={styles.question}>{translate.pages.faq.tenthQuestion}</p>
          <p className={styles.answer}>{translate.pages.faq.tenthAnswer}</p>
        </div>
      </div>
    </div>
  )
}

export default Faq
