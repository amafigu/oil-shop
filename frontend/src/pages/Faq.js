import { useEffectScrollTop } from "#utils/utils"
import { React } from "react"
import useLocaleContext from "../context/localeContext"
import styles from "./faq.module.scss"

const Faq = () => {
  const { translate } = useLocaleContext()

  useEffectScrollTop()
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.page}>
        <p>{translate.pages.faq.firstQuestion}</p>
        <p>{translate.pages.faq.firstAnswer}</p>
        <p>{translate.pages.faq.secondQuestion}</p>
        <p>{translate.pages.faq.secondAnswer}</p>
        <p>{translate.pages.faq.thirdQuestion}</p>
        <p>{translate.pages.faq.thirdAnswer}</p>
        <p>{translate.pages.faq.fourthQuestion} </p>
        <p>{translate.pages.faq.fourthAnswer}</p>
        <p>{translate.pages.faq.fifthAnswer}</p>
        <p>{translate.pages.faq.fifthQuestion}</p>
        <p>{translate.pages.faq.sixthQuestion}</p>
        <p>{translate.pages.faq.sixthAnswer}</p>
        <p>{translate.pages.faq.seventhAnswer}</p>
        <p>{translate.pages.faq.eighthQuestion}</p>
        <p>{translate.pages.faq.eighthAnswer}</p>
        <p>{translate.pages.faq.ninthQuestion}</p>
        <p>{translate.pages.faq.ninthAnswer}</p>
        <p>{translate.pages.faq.tenthQuestion}</p>
        <p>{translate.pages.faq.tenthAnswer}</p>
      </div>
    </div>
  )
}

export default Faq
