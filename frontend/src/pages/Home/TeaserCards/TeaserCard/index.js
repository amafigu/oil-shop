import { useTranslation } from "#hooks/useTranslation"
import { accessTranslationWithPathString } from "#utils/accessTranslationWithPathString"
import { getIconByName } from "#utils/getIconByName"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./teaserCard.module.scss"

export const TeaserCard = ({ title, text, iconName }) => {
  const { translate } = useTranslation()

  return (
    <article className={styles.container} aria-label='teaser'>
      <p className={styles.title}>
        {accessTranslationWithPathString(translate, title)}
      </p>
      <p className={styles.text}>
        {accessTranslationWithPathString(translate, text)}
      </p>
      <span className={styles.icon}>
        <FontAwesomeIcon icon={getIconByName(iconName)} size='xs' />
      </span>
    </article>
  )
}
