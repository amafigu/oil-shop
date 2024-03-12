import { useTranslation } from "#hooks/useTranslation"
import { accessTranslationWithPathString } from "#utils/accessTranslationWithPathString"
import { getIconByName } from "#utils/getIconByName"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./teaserCard.module.scss"

export const TeaserCard = ({ title, text, iconName }) => {
  const { translate } = useTranslation()

  return (
    <article className={styles.teaserSingleCard} aria-label='teaser'>
      <p className={styles.teaserCardTitle}>
        {accessTranslationWithPathString(translate, title)}
      </p>
      <p className={styles.teaserCardText}>
        {accessTranslationWithPathString(translate, text)}
      </p>
      <span className={styles.iconColumns}>
        <FontAwesomeIcon icon={getIconByName(iconName)} size='xs' />
      </span>
    </article>
  )
}
