import { useTranslation } from "#hooks/useTranslation"
import { getIconByName } from "#utils/getIconByName"
import { translateByPath } from "#utils/translateByPath"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./teaserCard.module.scss"

export const TeaserCard = ({ title, text, iconName }) => {
  const { translate } = useTranslation()

  return (
    <article className={styles.container} aria-label='teaser'>
      <p className={styles.title}>{translateByPath(translate, title)}</p>
      <p className={styles.text}>{translateByPath(translate, text)}</p>
      <span className={styles.icon}>
        <FontAwesomeIcon icon={getIconByName(iconName)} size='xs' />
      </span>
    </article>
  )
}
