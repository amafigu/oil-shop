import { FC, ReactElement } from "react"
import { Link } from "react-router-dom"
import styles from "./noItemsCard.module.scss"

interface NoItemsCardProps {
  icon: ReactElement
  title: string
  subtitle: string
  route?: string
  link: string
}
export const NoItemsCard: FC<NoItemsCardProps> = ({
  icon,
  title,
  subtitle,
  route,
  link,
}) => {
  return (
    <article className={styles.card}>
      <div className={styles.container}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{subtitle}</div>
      </div>
      {route && (
        <Link to={route} className={styles.link}>
          <span className={styles.linkContent}>{link}</span>
        </Link>
      )}
    </article>
  )
}
