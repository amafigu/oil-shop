import { FC, ReactElement } from "react"
import { Link } from "react-router-dom"
import styles from "./optionCard.module.scss"

interface OptionCardsProps {
  route: string
  icon: ReactElement
  title: string
}
export const OptionCard: FC<OptionCardsProps> = ({ route, icon, title }) => {
  return (
    <Link to={route}>
      <article className={styles.card}>
        <div className={styles.container}>
          <div className={styles.icon}>{icon}</div>
          <div className={styles.title}>{title}</div>
        </div>
      </article>
    </Link>
  )
}
