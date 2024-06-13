import { teaserCards } from "#constants/cards"
import { useTranslation } from "#hooks/useTranslation"
import React from "react"
import { TeaserCard } from "./TeaserCard"
import styles from "./teaserCards.module.scss"

export const TeaserCards = () => {
  const { translate } = useTranslation()
  return (
    <section className={styles.wrapper} aria-label='teaser items'>
      <div className={styles.container}>
        <p className={styles.title}>
          {translate.pages.welcome.subTeaser.title}
        </p>
      </div>
      <div className={styles.cards}>
        {teaserCards.map((card, index) => (
          <TeaserCard
            title={card.title}
            text={card.text}
            iconName={card.iconName}
            key={index}
          />
        ))}
      </div>
    </section>
  )
}
