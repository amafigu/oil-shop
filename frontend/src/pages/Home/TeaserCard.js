import { useTranslation } from "#hooks/useTranslation"
import { getTeaserCardIconByName } from "#utils/icons"
import { accessTranslationWithPathString } from "#utils/translation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./teaserCard.module.scss"

export const TeaserCard = ({ title, text, iconName }) => {
  const { translate } = useTranslation()

  return (
    <div className={styles.teaserSingleCard}>
      <p className={styles.teaserCardTitle}>
        {accessTranslationWithPathString(translate, title)}
      </p>
      <p className={styles.teaserCardText}>
        {accessTranslationWithPathString(translate, text)}
      </p>
      <span className={styles.iconColumns}>
        <FontAwesomeIcon icon={getTeaserCardIconByName(iconName)} size='xs' />
      </span>
    </div>
  )
}
