import { FC, ReactElement } from "react"
import { Link } from "react-router-dom"
import styles from "./optionCard.module.scss"

interface OptionCardProps {
  route: string
  icon?: ReactElement
  title: string
}
export const OptionCard: FC<OptionCardProps> = ({ route, icon, title }) => {
  return (
    <div className={styles.optionCardContainer}>
      <Link to={route}>
        <article className={styles.card}>
          <div className={styles.container}>
            {icon && <div className={styles.icon}>{icon}</div>}
            <div className={styles.title}>{title}</div>
          </div>
        </article>
      </Link>
    </div>
  )
}
