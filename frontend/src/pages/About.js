import useLocaleContext from "#context/localeContext"
import { useEffectScrollTop } from "#utils/render"
import React from "react"
import styles from "./about.module.scss"

const About = () => {
  const { translate } = useLocaleContext()
  const text = translate.pages.about
  useEffectScrollTop()
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.page}>
        <div className={styles.text}>{text.title}</div>
      </div>
    </div>
  )
}

export default About
