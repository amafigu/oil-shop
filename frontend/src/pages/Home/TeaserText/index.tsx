import { useTranslation } from "#hooks/useTranslation"
import React from "react"
import styles from "./teaserText.module.scss"

export const TeaserText = () => {
  const { translate } = useTranslation()
  return (
    <section className={styles.wrapper} aria-label='teaser section'>
      <div className={styles.container}>
        <h2 className={styles.title}>{translate.pages.welcome.title}</h2>
        <h3 className={styles.subtitle}>
          {translate.pages.welcome.teaserSentence}
        </h3>
        <h3 className={styles.subtitle}>
          {translate.pages.welcome.teaserSubSentenceOne}
        </h3>
        <h3 className={styles.subtitle}>
          {translate.pages.welcome.teaserSubSentenceTwo}
        </h3>
        <h3 className={styles.subtitle}>
          {translate.pages.welcome.teaserSubSentenceThree}
        </h3>
        <h3 className={styles.subtitle}>
          {translate.pages.welcome.teaserSubSentenceFour}
        </h3>
      </div>
    </section>
  )
}
