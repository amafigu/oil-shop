import { useTranslation } from "@/hooks/useTranslation"
import { getIconByName } from "@/utils/getIconByName"
import { translateByPath } from "@/utils/translateByPath"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FC } from "react"
import styles from "./teaserCard.module.scss"

interface TeaserCardProps {
  title: string
  text: string
  iconName: string
}

export const TeaserCard: FC<TeaserCardProps> = ({ title, text, iconName }) => {
  const { translate } = useTranslation()
  const icon = getIconByName(iconName)
  return (
    <article className={styles.container} aria-label='teaser'>
      <p className={styles.title}>{translateByPath(translate, title)}</p>
      <p className={styles.text}>{translateByPath(translate, text)}</p>
      <span className={styles.icon}>
        {icon && <FontAwesomeIcon icon={getIconByName(iconName)} size='xs' />}
      </span>
    </article>
  )
}
