import { useTranslation } from "@/hooks/useTranslation"
import { FC } from "react"
import styles from "./teaserText.module.scss"

export const TeaserText: FC = () => {
  const { pages } = useTranslation()
  return (
    <section className={styles.wrapper} aria-label='teaser section'>
      <div className={styles.container}>
        <h2 className={styles.title}>{pages.home.title}</h2>
        <h3 className={styles.subtitle}>{pages.home.text}</h3>
      </div>
    </section>
  )
}
