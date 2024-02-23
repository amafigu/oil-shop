import { useTranslation } from "#hooks/useTranslation"
import { scrollToTop } from "#utils/render"
import React from "react"
import styles from "./about.module.scss"

const About = () => {
  const { translate } = useTranslation()
  const text = translate.pages.about
  scrollToTop()
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.page}>
        <div className={styles.text}>{text.title}</div>
      </div>
    </div>
  )
}

export default About
